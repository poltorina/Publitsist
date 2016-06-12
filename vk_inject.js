(function (){ 
  var postObserver = new MutationObserver(listModified);
  var list_ids = ['feed_rows', 'page_wall_posts', 'results', 'wall_fixed', 'wk_content', 'fw_post'];
  for (var i= 0 ; i < list_ids.length; i++) {
    var list = document.getElementById(list_ids[i]);
    if (list) {
      listFound(list);
    }
  }

  var listObserver = new MutationObserver(elementAdded);
  listObserver.observe(document.body, {attributes: true, characterData: true, childList: true, subtree: true});

  function elementAdded(mutations) {
    for (var i = 0; i < mutations.length; i++) {
      var added = mutations[i].addedNodes;
      for (var j = 0; j < added.length; j++) {
        findPostLists(added[j]);
      }
    }
  }

  function findPostLists(node) {
    if (node.id) {
      for (var i = 0; i < list_ids.length; i++) {
        if (list_ids[i] == node.id) {
          listFound(node);
          return; 
        }
      }
    }
    var child = node.firstElementChild;
    while (child) {
      findPostLists(child); 
      child = child.nextElementSibling;
    }
  }

  function listFound(listNode) {
    if (listNode.children.length) { 
      for (var j = 0; j < listNode.children.length; j++) {
        addPostButton(listNode.children[j]); 
      }
    }
    postObserver.observe(listNode, {attributes: true, characterData: true, childList: true, subtree: true});
  }

  function listModified(mutations) {
    for (var i = 0; i < mutations.length; i++) {
      var mut = mutations[i];
      for (var j = 0; j < mut.addedNodes.length; j++) {
        addPostButton(mut.addedNodes[j]);
      }
    }
  }

  function addPostButton(row) {
    //console.log(row);
    // console.log($(row));
    var link = document.createElement('button');
    link.className = 'publish';
    link.textContent = "Пост";
    link.addEventListener("click", publisher);

    if ($(row).hasClass('wall_module') || $(row).hasClass('feed_row') || $(row).hasClass('post') || $(row).children().hasClass('post')) {
      var titleNode = row.querySelector('div.post_full_like');
      //console.log(row.classList)
      if (!titleNode) { 
        return;
      }
      if (titleNode.querySelector('button.publish')) {
        return;
      }
      $(titleNode).append(link);

    } else if ($(row).hasClass('fw_post_table')) {
      var titleNode = row.querySelector('div.fw_post_bottom');

      if (!titleNode) { 
        return;
      }
      if (titleNode.querySelector('button.publish')) {
        return; 
      }
      $(titleNode).append(link);

    } else if ($(row).is('#wl_post')) {
      console.log($(row).attr('id'))
      var titleNode = row.querySelector('div#wl_post_actions_wrap');
      if (!titleNode) { 
        return;
      }
      if (titleNode.querySelector('button.publish')) {
        return;
      }
      $(titleNode).append(link);
    }

  }

})();





var infoMassage = '';
//add post in your group
function getToken(data, item) {
  this.data = data;
  this.item = item;
  var idGroup = $('.showGroup').attr('id');
  var text1 = $('.postText textarea').val();
  var media = [];
  var findMedia = $('.postEditX'); 
  var findId = $('.postEditX').map(function (index, element){
    return $(element).attr("id");
    console.log(findId);
  })
  var arr = findId.get();
  var text = encodeURIComponent(text1);

 


  if ($('.picker #timer').hasClass('timerActive')) {

  console.log($('#datepicker').val() + "T" + $('#showHours p').text() + ":" + $('#showMinute p').text())
    var unixTime = moment($('#datepicker').val() + "T" + $('#showHours p').text() + ":" + $('#showMinute p').text()).unix();
   // $.post("https://api.vk.com/method/wall.post?owner_id=-" + idGroup + "&from_group=1&message=" + text + " http://cs619126.vk.me/v619126414/19139/294_73Vq-50.jpg" + "&attachments=" + arr + "&publish_date=" + unixTime + "&version=5.40&lang=ru&access_token=" + item, posted);
    
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "https://api.vk.com/method/wall.post?owner_id=-" + idGroup + "&from_group=1&version=5.40&lang=ru&access_token=" + item,
      data: {
        publish_date: unixTime,
        message: text1,
        attachments: arr
      },
      success: posted,
      error: posted
    });

  } else {
    $.ajax({
      type: "POST",
      dataType: "json",
      url: "https://api.vk.com/method/wall.post?owner_id=-" + idGroup + "&from_group=1&version=5.40&lang=ru&access_token=" + item,
      data: {
        message: text1,
        attachments: arr
      },
      success: posted,
      error: posted
    });
  }
}
  function posted(data){
    var idGroup = $('.postGroup_active').attr('id');
    $('.modalInfo p#massageInfo').empty();
    $('.modalInfo').css('display', 'block');
    console.log(data)
    if (data.error) {
      if (data.error.error_code = 214){
        $('.modalInfo p#massageInfo').append("Публикация запрещена. Превышен лимит на число публикаций в сутки, либо на указанное время уже запланирована другая запись. ");
      } else if (data.error.error_code = 219) {
        $('.modalInfo p#massageInfo').append('Рекламный пост уже недавно публиковался.');
      } else if(data.error.error_code = 222) {
        $('.modalInfo p#massageInfo').append('Запрещено размещать ссылки.');
      }
    } else if (data.response) {
      $('.modalInfo p#massageInfo').append('Опубликовано. <a href="wall-' + idGroup + '_' + data.response.post_id + '">Просмотреть</a>');
    }
    $('.modalInfo').delay(5000).fadeOut();
  }

//add modal form
var start = '<div id="modal_form"><div class="ourName"><p>Публицист</p><span id="modal_close">Закрыть</span></div>';
var tabs = '<div id="showGroup"><div class="showGroup"><img><p><span></span></p><div id="openDown"></div></div></div>';
var content = '<ul class="listGroups"></ul><div id="tabs"><div id="tabs-1" class="tabs-panel"></div></div><div id="tabsDown">';
var timePost = '<div class="picker"><div id="timer"><img src="http://s019.radikal.ru/i612/1511/9a/cd93e2e54613.png"><p>Таймер</p></div>';
var data = '<input type="text" id="datepicker"><div id="showtime"><div id="showHours"><p>00</p><ul class="timepicker" id="hours"><li>00</li><li>01</li><li>02</li><li>03</li><li>04</li><li>05</li><li>06</li><li>07</li><li>08</li><li>09</li><li>10</li><li>11</li><li>12</li>';
var time = '<li>13</li><li>14</li><li>15</li><li>16</li><li>17</li><li>18</li><li>19</li><li>20</li><li>21</li><li>22</li><li>23</li><li>24</li></ul></div>:<div id="showMinute"><p>00</p><ul class="timepicker" id="minute"><li>00</li><li>05</li><li>10</li>'
var minute = '<li>15</li><li>20</li><li>25</li><li>30</li><li>35</li><li>40</li><li>45</li><li>50</li><li>55</li></ul></div></div>'
var end = '</div><button class="buttonPost">Опубликовать</button></div>';
var overlay = '</div><div id="overlay"></div>';
var modalInfo = "<div class='modalInfo'><div id='modalName'><p>Публицист</p><span>Закрыть</span></div><p id='massageInfo'></p></div>";
var all = start + tabs + content + timePost + data + time + minute + end + overlay + modalInfo;
$('body').append(all);

$("#datepicker").datepicker({
 firstDay: 1, minDate:0 });
$("#datepicker").datepicker("option", "dateFormat", "yy-mm-dd");


var scriptFont = "<link href='https://fonts.googleapis.com/css?family=PT+Sans&subset=latin,cyrillic' rel='stylesheet' type='text/css'>"
$('head').prepend(scriptFont);

$('.showGroup').click(function() {
  $('.listGroups').toggle();
});

$('.picker #timer').click(function() {
  $('.picker #timer').toggleClass('timerActive');
  if ($('.picker #timer').hasClass('timerActive')) {
    $('.picker #showtime, #datepicker').css('display', 'inline-block');
    $('#datepicker').val(moment().format("YYYY-MM-DD"));
  }
   else {
    $('.picker #showtime, #datepicker').css('display', 'none');
  }
})


$('#showHours').click(function() {
  $('#hours').toggleClass('hoursActive');
});
$('#showMinute').click(function() {
  $('#minute').toggleClass('minuteActive');
});


$('#tabs, #showGroup, .ourName, #datepicker, #showMinute, .buttonPost, #timer').click(function () {
    $("#hours").removeClass('hoursActive');
});
$('#tabs, #showGroup, .ourName, #datepicker, #showHours, .buttonPost, #timer').click(function () {
    $("#minute").removeClass('minuteActive');
});

$('.timepicker#hours li').click(function(){
  $('#showHours p').empty();
  $('.timepicker#hours li').removeClass('liHourActive');
  $(this).addClass('liHourActive');
  $('#showHours p').append($('.liHourActive').text());
})
$('.timepicker#minute li').click(function(){
  $('#showMinute p').empty();
  $('.timepicker#minute li').removeClass('liMinuteActive');
  $(this).addClass('liMinuteActive');
  $('#showMinute p').append($('.liMinuteActive').text());
})
$('.modalInfo #modalName span, .modalInfo p#massageInfo a, .scroll_fix_wrap').click(function() {
  $('.modalInfo').css('display', 'none');
});


chrome.storage.sync.get('userid', function(item){
  getGroups(item.userid);
})
function getGroups(data){
chrome.storage.sync.get('vkauthtoken', function(items){
  $.getJSON("https://api.vk.com/method/groups.get?user_id=" + data + "&extended=1&filter=admin&count=20&version=5.40&access_token=" + items.vkauthtoken, getGroupsAll);
  
  $('.buttonPost').click(function() {
    var param = new getToken(data, items.vkauthtoken);
  });
});
}


function publisher() {

  if ($('.picker #timer').hasClass('timerActive')) {
    $('#datepicker').val(moment().format("YYYY-MM-DD"));
  }
  $('.showGroup p span').append($('.postGroup_active').text());
  $('.showGroup img').attr('src', $('.postGroup_active img').attr('src'));
  $('.showGroup').attr('id', $('.postGroup_active').attr('id'));
  $('#tabs, .ourName, #tabsDown, .listGroups').click(function() {
    $('.listGroups').css('display', 'none');
  });

  if ($(this).closest('.post').attr('class')){
    var show_id = $(this).closest('.post').attr("id");
  }
  if (!show_id) {
    show_id = $(this).closest('#wl_post').find('.wl_owner_head_thumb').attr('data-post-id');
      if (!show_id) {
        show_id = $(this).closest('.fw_post_bottom').prev().attr('id');
      }
  }
  var show = show_id.replace(/[^0-9-_]/g, '');

  chrome.storage.sync.get('vkauthtoken', function(items){
    $.getJSON("https://api.vk.com/method/wall.getById?posts=" + show + "&extended=1&copy_history_depth=2&version=5.40&access_token=" + items.vkauthtoken, pop);
  })

var titlePubl = 0;
function getAlbums(data){
  var response = data.response;
  for (var i = 0;i<response.length;i++) {
    if (response[i].title == "Публицист") {
      titlePubl = 1;
    } 
  }
  if (titlePubl == 0) {
    chrome.storage.sync.get('vkauthtoken', function(items){
      $.getJSON("https://api.vk.com/method/photos.createAlbum?title=" + encodeURIComponent('Публицист') + "&comments_disabled=1&privacy_view:[only_me]&upload_by_admins_only=1&group_id=" + $('.showGroup').attr('id') + "&version=5.30&access_token=" + items.vkauthtoken, createAlbum);
    })
  }
}

  event.preventDefault(); // выключaем стaндaртную рoль элементa
  $('#overlay').fadeIn(400, function() {
    $('#modal_form').css('display', 'block').animate({opacity: 1, top: '50%'}, 200);
    $('body').css('overflow', 'hidden');
  });

  $('#modal_close, #overlay, .buttonPost').click( function(){
    $('#modal_form').animate({opacity: 0, top: '45%'}, 200, function(){
      $('body').css('overflow', 'visible');
      $(this).css('display', 'none'); 
      $('#overlay').fadeOut(400);
    });
    $('#tabs-1').empty();
    $('.listGroups').css('display', 'none');
      $('.showGroup p span').empty();
      $('.showGroup img').attr('src', '');
  });

  return;
}


var pop = function(data) {
        console.log(data)
  //console.log(data)
  var response = data.response.wall[0];
  var text = response.text;
  var text1 = text.replace(/<br\s*\/?>/mg,"\n");
  var postText = "<div class=\"postText\"><textarea class='autoExpand' data-min-rows='3'>" + text1 + "</textarea></div>";
  $('#tabs-1').prepend(postText);
  $('#tabs-1').append("<div class=\"imag\"></div>");
  $('#tabs-1').append("<div id='postAudio'></div>");
  var attachments = response.attachments;
  photoUpl = [];
  var photoJs = '';
  var photo, photoSmall, postPhoto, link, linkUrl, linkTitle, postLink, video, videoIcon, videoTitle, postVideo, sec, videoLength, audio, audioArtist, audioTitle, audioUrl, postAudio, doc, docPhoto, postDoc, poll, pollQuestion, postPoll, album, album, albumSize, albumThumb, albumTitle, postAlbum;
  if (attachments) {  
    $.each(attachments, function(index, val) {
      if (val.photo) {
        photoJs = val.photo;
        photo = val.photo;
        photoSmall = photo.src;
        photoUpl.push(photo.src_big);
        postPhoto = '<div class=\"postEditX postPhoto\" id="photo' + photo.owner_id + "_" + photo.pid + '"><div class="bgPhoto" style=\"background-image:url(' + photoSmall + ')"><p class=\"clearX\"></p></div></div';
        $('#tabs-1 .imag').append(postPhoto);
      }
      if (val.doc) {
        doc = val.doc;
        docPhoto = doc.thumb;
        postDoc = "<div class=\"postEditX postPhoto\" id=\"doc" + doc.owner_id + "_" + doc.did + "\"><div class=\"bgPhoto dGif\" style=\"background-image:url(" + docPhoto + ")\"><p class=\"gif\">gif</p><p class=\"clearX\"></p></div></div>";
        $('#tabs-1 .imag').append(postDoc);
      }
      if (val.video) {
        video = val.video;
        videoIcon = video.image;
        videoTitle = video.title;
        sec = video.duration;
        videoLength = Math.floor(sec / 60) + ':' + sec % 60;
        if (sec >= 3600) {
          videoLength = Math.floor(sec / 3600) + ':' + Math.floor(sec / 60 - (Math.floor(sec / 3600) * 60)) + ':' + sec % 60;
        }  
        postVideo = "<div class=\"postPhoto postEditX\" id=\"video" + video.owner_id + "_" + video.vid + "\"><div class='bgPhoto fGif' style=\"background-image:url(" + videoIcon + ")\"><p class=\"gif\"><span class=\"page_post_video_duration_icon\"></span>" + videoLength + "</p><p class=\"clearX\"></p></div></div>"/*"<div class=\"videoText\"><p>" + videoTitle + "</p></div></div>"*/;
        $('#tabs-1 .imag').append(postVideo);
      }
      if (val.album) {
        album  = val.album ;
        albumSize = album.size;
        albumThumb = album.thumb;
        albumPhoto = albumThumb.src;
        albumTitle = album.title;
        postAlbum = "<div class=\"postPhoto postEditX\" id=\"album" + album.owner_id + "_" + album.aid + "\"><div class='bgPhoto fGif' style=\"background-image:url(" + albumPhoto + ")\"><p class=\"gif\"><span class=\"wall_album_count\"></span>" + albumSize + "</p><p class=\"clearX\"></p></div></div>";/*"<p class=\"albumName\">" + albumTitle + "</p><p class=\"clearX\"></p></div>";*/
        $('#tabs-1 .imag').append(postAlbum);
      }
      if (val.audio) {
        $("#postAudio").css("display", "block");
        audio = val.audio;
        audioArtist = audio.artist;
        audioTitle = audio.title;
        audioUrl = audio.url;
        postAudio = "<div class=\"postAudio postEditX\" id=\"audio" + audio.owner_id + "_" + audio.aid + "\"><div class ='medaddPlay'></div><div class=\"audioText\"><b>" + audioArtist + "</b>" + " – " + "<span>" + audioTitle + "</span></div><div class=\"clearX\"></div></div>";
        $('#tabs-1 #postAudio').append(postAudio);
      }
      if (val.link) {
        link = val.link;
        linkUrl = link.url;
        linkTitle = link.title;
        postLink = "<div class=\"link postEditX\" id=\"" + linkUrl + "\"><b></b><a href=\"" + linkUrl + "\">" + linkTitle + "</a><div class=\"clearX\"></div></div>";
        $("#tabs-1").append(postLink);
      }
      if (val.poll ) {
        poll  = val.poll ;
        pollQuestion = poll.question;
        postPoll = "<div class=\"poll postEditX\" id=\"poll" + response.from_id + "_" + poll.poll_id + "\"><img src=\"http://s018.radikal.ru/i525/1511/d7/a8985d0a2770.jpg\"/><p id='namePoll'>" + pollQuestion + "</p><div class=\"clearX\"></div></div>"; 
        $('#tabs-1').append(postPoll);
      }
    })
  }

  if(photoUpl.length > 0) {
    var bloob = new Blob(["http://cs619126.vk.me/v619126414/19130/gsWaeTAtBkg.jpg"], {type : 'image/jpeg'});
    var blobUrl = URL.createObjectURL(bloob);
console.log(blobUrl)



        chrome.storage.sync.get('vkauthtoken', function(items){
          $.getJSON("https://api.vk.com/method/photos.getWallUploadServer?group_id=47933433&version=5.41&access_token=" + items.vkauthtoken, createAlbum);
          function createAlbum(data) {
           // console.log(data.response.upload_url)
            $.ajax({
              type: "POST",
              dataType: "json",
              //ContentDisposition: "form-data",
              //ContentType: "image/jpeg",
              url: data.response.upload_url,
              data: {
                photo: blobUrl //"http://cs619126.vk.me/v619126414/19130/gsWaeTAtBkg.jpg"
              },
              success: postedUpl,
              error: postedUpl
            });
           // "photo=" + photo.src_big
            }
          function postedUpl(data) {
            console.log(data)
            $.ajax({
              type: "POST",
              dataType: "json",
              url: "https://api.vk.com/method/photos.saveWallPhoto?group_id=47933433&version=5.41&access_token=" + items.vkauthtoken,
              data: {
                photo: data.photo,
                server: data.server,
                hash: data.hash
              },
              success: saveUpl,
              error: saveUpl
            });
          }
          function saveUpl(data) {
            console.log(data)

          }
        })
  }

  $(".clearX").click(function() {
    $(this).closest('.postEditX').remove();
  });
  var autoH = $('.autoExpand').val().length * 0.35;
  $('.autoExpand').css('height', autoH);


  var bgElem = $('.imag .postPhoto .bgPhoto');
  var bgThree = $('.imag .postPhoto .bgPhoto').slice(0,3);
  var bgSeven = $('.imag .postPhoto .bgPhoto').slice(3);
  var bgSix = $('.imag .postPhoto .bgPhoto').slice(0,6);
  var bgAll = $('.imag .postPhoto .bgPhoto').slice(6);

  var bgW = '';

  switch(bgElem.length) {
    case 8:
    case 4:
      bgElem.width(120);
      bgElem.height(80);
      break;
    case 1:
    case 2:
    case 3:
    case 6:
    case 9:
    case 10:
      bgSix.width(163);
      bgSix.height(110);
      var bgW = (502 / bgAll.length) - 2;
      var bgH = (bgW * 0.7);
      bgAll.width(bgW);
      bgAll.height(bgH);
      break;
    case 7:
      bgThree.width(163);
      bgThree.height(110);
      bgSeven.width(120);
      bgSeven.height(80);
      break;
  }

}






var groupName, groupPhoto, groupId, postGroup;
function getGroupsAll(datas) {
  var responseItem = datas.response;
  $.each(responseItem, function(index, val) {
    if (val.name) {
      groupName = val.name;
      groupPhoto = val.photo;
      groupId = val.gid;
      postGroup = "<li class=\"postGroup\" id=\"" + groupId + "\"><img src=\"" + groupPhoto + "\"><div><p>" + groupName + "</p></div></li>";
      $('#modal_form .listGroups').append(postGroup);
    }
  })
  $('.listGroups>li:nth-child(1)').addClass('postGroup_active');

  $('.postGroup').click(function(){
    $('.showGroup p span').empty();
    $('.showGroup img').attr('src', '');
    $('.postGroup').removeClass('postGroup_active');
    $(this).addClass('postGroup_active');
    $('.showGroup p span').append($('.postGroup_active').text());
    $('.showGroup img').attr('src', $('.postGroup_active img').attr('src'));
    $('.showGroup').attr('id', $('.postGroup_active').attr('id'));
  })
}












































