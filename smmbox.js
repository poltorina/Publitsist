function eventsAdd() {
    moment.locale("ru"),
    $(".js-modal-settings").click(function() {
        $("#settings").modal()
    }
    ),
    $("#smmbox_attach_video").click(function() {
        $("#addpost_video").modal()
    }
    ),
    $("#smmbox_attach_audio").click(function() {
        $("#addpost_audio").modal()
    }
    ),
    $("#smmbox_attach_question").click(function() {
        $("#addpost_question").modal(),
        $("#addpost_question").find("#add_question").val(""),
        $("#addpost_question").find("#answerForQuestion .poll-answers__item:not(:first-child)").remove(),
        $("#addpost_question").find("#answerForQuestion .poll-answers__input").val("")
    }
    ),
    $("#smmbox_attach_link").click(function() {
        $("#addpost_link").modal()
    }
    ),
    $("#smmbox_attach_text").click(function() {
        var a = {
            preview: "",
            id: "",
            type: "text",
            title: "",
            original: "",
            BoollDesktop: ""
        };
        attachmentWidget.addAttach(a)
    }
    ),
    $("#smmbox_attach_img").click(function() {
        $("#addpost_img").modal(),
        $("#smmbox_urlimginput").val("")
    }
    ),
    setTimeout(addrefreshbuton, 5e3),
    $('[data-toggle="tooltip"]').tooltip(),
    $("#smmbox_loadimgbut").click(function() {
        $("#fileupload").click(),
        $("#addpost_img").modal("hide")
    }
    ),
    $("#smmbox_urlimgbut").click(function() {
        var a = $("#smmbox_urlimginput").val();
        "" != a && (attachmentWidget.addAttachLoader(1, "photo"),
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "https://smmbox.com/popup/upload.php",
            data: {
                url: a
            },
            success: function(a) {
                if ("error" != a.result) {
                    var b = {
                        preview: a.file.preview,
                        id: "",
                        type: "photo",
                        title: "",
                        original: a.file.original,
                        BoollDesktop: "1"
                    };
                    attachmentWidget.addAttach(b)
                } else
                    attachmentWidget.addAttachLoader(0),
                    smmboxError.showError(a.message, "internal")
            }
        }),
        $("#addpost_img").modal("hide"))
    }
    ),
    $("#datetimepicker1").click(function() {
        $(".input-group-addon").click()
    }
    ),
    $("#searchvideo").click(function() {
        findvideoVk()
    }
    ),
    $("#searchaudio").click(function() {
        findaudioVk()
    }
    ),
    $("#link_MyVideo").click(function() {
        getMyvideoVk()
    }
    ),
    $("#link_MyAudio").click(function() {
        getMyaudioVk()
    }
    ),
    $("#DeleteHash").click(function() {
        DeleteHash()
    }
    ),
    $("#addpost_answers").focus(function() {
        addAnswer()
    }
    ),
    $("#addpost_answers").click(function() {
        addAnswer()
    }
    ),
    $(".removeAnswer").click(function() {
        removeAnswer(this)
    }
    ),
    $("#addPostquestion").click(function() {
        "" != $("#add_question").val() && "" != $("#answerForQuestion .poll-answers__item:first-child input").val() && attachmentWidget.createPoll()
    }
    ),
    $("#addLink").click(function() {
        addLink()
    }
    ),
    $("#add_tags").click(function() {
        OpenDiv()
    }
    ),
    $("#sendCaptcha").click(function() {
        SendCaptchaVk()
    }
    ),
    $("#smmbox_text").on("keyup", function(a) {
        countHash()
    }
    ),
    $("#smmbox-body").on("click", "#refreshtoken_vk", function() {
        refreshconnect_vk()
    }
    ),
    $("#smmbox-body").on("click", "#refreshtoken_ok", function() {
        refreshconnect_ok()
    }
    ),
    $("#smmbox_button_posting").click(function() {
        SendPost()
    }
    ),
    $("#smmbox_select").change(function() {
        groupWidget.changeGroup()
    }
    ),
    $("#addpost_video").on("show.bs.modal", function(a) {
        void 0 == Global_idGroup.collection.id ? findvideoVk() : getMyvideoVk()
    }
    ),
    $("#addpost_video").on("shown.bs.modal", function() {
        void 0 == jscrollBlocks.videoResultPane && (jscrollBlocks.videoResult.jScrollPane(),
        jscrollBlocks.videoResultPane = jscrollBlocks.videoResult.data("jsp"))
    }
    ),
    $("#addpost_audio").on("show.bs.modal", function(a) {
        void 0 == Global_idGroup.collection.id ? findaudioVk() : getMyaudioVk()
    }
    ),
    $("#addpost_audio").on("shown.bs.modal", function() {
        void 0 == jscrollBlocks.audioResultPane && (jscrollBlocks.audioResult.jScrollPane(),
        jscrollBlocks.audioResultPane = jscrollBlocks.audioResult.data("jsp"))
    }
    ),
    $("#addpost_video_query").on("keypress", function(a) {
        "" != this.value && 13 == event.keyCode && findvideoVk()
    }
    ),
    $("#addpost_audio_query").on("keypress", function(a) {
        "" != this.value && 13 == event.keyCode && findaudioVk()
    }
    ),
    $("#nillMinut").on("ifClicked", function() {
        $("#nillMinut").is(":checked") ? storage.set({
            nillMinut: !0
        }) : storage.set({
            nillMinut: !1
        })
    }
    ),
    $("#AlwaysRemoveHashtag").on("ifChecked", function() {
        storage.set({
            AlwaysRemoveHashtag: !0
        })
    }
    ),
    $("#AlwaysRemoveHashtag").on("ifUnchecked", function() {
        storage.set({
            AlwaysRemoveHashtag: !1
        })
    }
    ),
    $("#CheckWmrk").on("ifClicked", function() {
        var a = !1;
        a = 1 == $("#CheckWmrk").prop("checked") ? !1 : !0,
        groupWidget.setSettings(Global_idGroup.idGroup, "CheckWmrk", a)
    }
    ),
    $("#CheckAdmin").on("ifClicked", function() {
        1 == $("#CheckAdmin").prop("checked") ? ($("#CheckSign").closest(".icheckbox_flat").hide(),
        $(".CheckSignText").hide(),
        groupWidget.setSettings(Global_idGroup.idGroup, "CheckAdmin", !1)) : ($("#CheckSign").closest(".icheckbox_flat").show(),
        $(".CheckSignText").show(),
        groupWidget.setSettings(Global_idGroup.idGroup, "CheckAdmin", !0))
    }
    ),
    $("#CheckSign").on("ifClicked", function() {
        1 == $("#CheckSign").prop("checked") ? groupWidget.setSettings(Global_idGroup.idGroup, "CheckSign", !1) : groupWidget.setSettings(Global_idGroup.idGroup, "CheckSign", !0)
    }
    ),
    storage.get(["nillMinut", "AlwaysRemoveHashtag"], function(a) {
        var b = null  == a.nillMinut ? a.nillMinut : a.nillMinut.toString();
        "true" == b ? $("#nillMinut").iCheck("check") : $("#nillMinut").iCheck("uncheck");
        var b = null  == a.AlwaysRemoveHashtag ? a.AlwaysRemoveHashtag : a.AlwaysRemoveHashtag.toString();
        "true" == b ? $("#AlwaysRemoveHashtag").iCheck("check") : $("#AlwaysRemoveHashtag").iCheck("uncheck")
    }
    ),
    $("#fileupload").fileupload({
        dataType: "json",
        sequentialUploads: !0,
        start: function(a, b) {
            $("#smmbox_attachments").scrollTo("max", 100),
            $("#addpost_img").modal("hide")
        },
        add: function(a, b) {
            attachmentWidget.addAttachLoader(1, "photo"),
            b.submit()
        },
        done: function(a, b) {
            if ("error" != b.result.result) {
                var c = {
                    preview: b.result.file.preview,
                    id: "",
                    type: "photo",
                    title: "",
                    original: b.result.file.original,
                    BoollDesktop: "1"
                };
                attachmentWidget.addAttach(c)
            } else
                attachmentWidget.addAttachLoader(0),
                smmboxError.showError(b.result.message, "internal")
        }
    }),
    $.fn.datepicker.dates.ru = {
        days: ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
        daysShort: ["вск", "пнд", "втр", "срд", "чтв", "птн", "сбт"],
        daysMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
        months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        monthsShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
        today: "Сегодня",
        clear: "Очистить"
    },
    calendarWidget.init(),
    $("#advertisement #adv_continue").hover(function() {
        $("#advertisement #adv_image").attr("src", "data/images/icondog2.png")
    }
    , function() {
        $("#advertisement #adv_image").attr("src", "data/images/icondog.png")
    }
    ),
    $("#smmbox_attachments").on("click", ".overflow_img", function(a) {
        var b = $(this);
        0 == $(this).hasClass("disabled") && (1 == b.hasClass("overflow_img-audio") ? $(a.target).closest(".icon-wrap").length < 1 && $(a.target).closest(".track").length < 1 && $(this).toggleClass("check") : 1 == b.hasClass("overflow_img-text") ? 0 == $(a.target).hasClass("scrollbar-macosx") && $(this).toggleClass("check") : $(this).toggleClass("check"))
    }
    ),
    $("#Footer_smmbox").click(function(a) {
        $(this);
        0 == $(a.target).hasClass("btn_skip") && 1 == $(".panel-main").hasClass("up") && "" != smmboxError.getCurrentError() && smmboxPopup.pushDown(!0)
    }
    ),
    $("#Footer_smmbox .footer-layer_error .btn_skip").click(function() {
        var a = {};
        a.error = "no",
        Global_success_posts -= 1,
        smmboxPopup.updatePopupAfterPost(a)
    }
    ),
    $(".scrollbar-macosx").scrollbar(),
    $("#smmbox-body .overlay").click(function() {
        "site" == Global_source ? parent.smmboxWindow.hideWin(0) : storage.set({
            HideWindow: !0,
            CloseID: Global_uniqID
        })
    }
    ),
    $('input[type="checkbox"]').iCheck({
        checkboxClass: "icheckbox_flat"
    })
}
function init_textarea() {
    function a() {
        c = $(f).val(),
        c = c.replace(/\n/g, "<br>"),
        $(g).html(c + '<br class="lbr">'),
        d = $(g).height() + 5,
        e = d > 80 ? d > 184 ? 105 : d - 80 : 0,
        $(f).closest(".textarea.scroll-wrapper").height(d),
        f.style.height = d + "px",
        $("#smmbox-body .block-attachments__container").height(288 - e)
    }
    function b() {
        window.setTimeout(a, 0)
    }
    var c, d, e, f = document.getElementById("smmbox_text"), g = ($(f).val(),
    document.getElementById("textarea-hidden"));
    observe(f, "change", a),
    observe(f, "cut", b),
    observe(f, "paste", b),
    observe(f, "drop", b),
    observe(f, "keydown", b),
    f.focus(),
    b(),
    $(f).scrollbar()
}
function EventsExtension(a) {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "https://smmbox.com/ext_events.php",
        data: {
            EventName: a
        }
    })
}
function OpenDiv() {
    var a = Global_idGroup.idGroup;
    "none" == $("#DivHeshAll").css("display") ? $.ajax({
        type: "POST",
        dataType: "json",
        url: "https://smmbox.com/popup/hashtagget.php",
        data: {
            gid: a
        },
        success: function(a) {
            if ($("#DivHesh").html(""),
            0 != a.hashtag.length)
                for (var b = 0; a.hashtag.length > b; b++)
                    $("#DivHesh").append('<div class="DivDivHash AddHashTeg"></div>'),
                    $("#DivHesh .AddHashTeg").last().text("#" + a.hashtag[b]);
            $(".AddHashTeg").click(function() {
                AddHash(this)
            }
            ),
            $(document).click(function(a) {
                $(a.target).closest("#DivHeshAll").length || ($("#DivHeshAll").fadeOut(400),
                a.stopPropagation())
            }
            ),
            DivHashBooll(),
            $("#DivHeshAll").show(),
            $("#DivHeshAll").focus()
        }
    }) : $("#DivHeshAll").hide()
}
function AddHash(a) {
    var b = $("#smmbox_text").val()
      , c = $(a).text();
    c = c.replace(" ", "");
    var d = RegExp(c + "([ #\\n]{1}|$)", "gi");
    null  != b.match(d) ? (b = b.replace(d, ""),
    b = b.replace("  ", " "),
    $("#smmbox_text").val(b)) : ("\n" != b[b.length - 1] ? $("#smmbox_text").val(b + " " + c) : $("#smmbox_text").val(b + c),
    b = $("#smmbox_text").val(),
    b = b.replace("  ", " "),
    $("#smmbox_text").val(b)),
    DivHashBooll(),
    $("#smmbox_text").scrollTo("max", 100)
}
function DivHashBooll() {
    var a = !1
      , b = $("#smmbox_text").val()
      , c = uniqueArray(b.match(/#[^ #\n,]+/gi));
    if ($(".DivClick").removeClass("DivClick").addClass("DivDivHash"),
    c.length > 0)
        for (var d = 0; d < c.length; d++)
            if (a = !0,
            $(".AddHashTeg").each(function(b) {
                c[d] == $(this).html() && ($(this).removeClass("DivDivHash").addClass("DivClick"),
                a = !1)
            }
            ),
            1 == a) {
                var e = Math.floor(1e5 * Math.random());
                $("#DivHesh").append('<div id="Newhash' + e + '" class="DivClick AddHashTeg HashNew">' + c[d] + "</div>"),
                $("#Newhash" + e).click(function() {
                    AddHash(this)
                }
                )
            }
    "" == $("#DivHesh").html() ? ($("#DivHesh").html('<div style="color: #999;" align="center">Для этой группы еще нет хэштегов. Они будут добавляться автоматически по мере их использования.</div>'),
    $("#DeleteHash").hide()) : $("#DeleteHash").show(),
    countHash()
}
function SearchHash() {
    var a = Global_idGroup.idGroup
      , b = $("#smmbox_text").val()
      , c = null ;
    if (c = uniqueArray(b.match(/#[^ #\n,]*/gi)),
    c.length > 0) {
        for (var d = 0; c.length > d; d++)
            c[d] = c[d].replace("#", "");
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "https://smmbox.com/popup/hashtagadd.php",
            data: {
                gid: a,
                hashtags: c
            },
            success: function(a) {}
        })
    }
}
function DeleteHash() {
    var a = $("#smmbox_text").val()
      , b = RegExp("#[^ #\\n]+", "gi");
    if (null  != a.match(b)) {
        a = a.replace(b, "");
        var b = RegExp("[ ]{2,}", "gi");
        a = a.replace(b, " ").trim(),
        $("#smmbox_text").val(a)
    }
    DivHashBooll(),
    $("#smmbox_text").scrollTo("max", 100),
    countHash()
}
function countHash() {
    var a = $("#smmbox_text").val()
      , b = uniqueArray(a.match(/#[^ #\n,]+/gi));
    b.length > 0 ? ($("#countHash").html(b.length).show(),
    $("#DeleteHash").css("color", "#2fa4e7")) : ($("#countHash").hide(),
    $("#DeleteHash").css("color", "#dddddd"))
}
function uniqueArray(a) {
    var b = [];
    return null  != a && $.each(a, function(a, c) {
        -1 == $.inArray(c, b) && b.push(c)
    }
    ),
    b
}
function addLink() {
    var a = $("#addpost_links").val()
      , b = RegExp("(http)", "gi");
    if (null  != a.match(b)) {
        var c = {
            preview: "",
            id: a,
            type: "link",
            title: "Ссылка",
            original: a,
            BoollDesktop: "",
            url: a
        };
        attachmentWidget.addAttach(c),
        $("#addpost_link").modal("hide")
    } else
        $("#addpost_links").animate({
            backgroundColor: "#FF8080"
        }, 600).animate({
            backgroundColor: "#FFFF"
        }, 600)
}
function refreshconnect_vk() {
    "site" == Global_source ? (parent.smmboxWindow.hideWin(400),
    parent.location.href = "https://smmbox.com/auth/reconnection.php?social=vk") : chrome.extension.sendMessage({
        topic: "smmbox.refreshconnect.finish"
    })
}
function refreshconnect_ok() {
    window.open("https://smmbox.com/auth/reconnection.php?social=ok", "_parent")
}
function addrefreshbuton() {
    $("#loader").append('<button style="text-align: center;margin: 5px auto;display: block;" id="refreshtoken_vk" type="button" class="btn btn-primary btn-sm btn-type_vk">Обновить соединение ВКонтакте</button><br><button style="text-align: center;margin: 5px auto;display: block;" id="refreshtoken_ok" type="button" class="btn btn-primary btn-sm btn-type_ok">Обновить соединение Одноклассники</button>')
}
function InternalMessage(a) {
    var b = ""
      , c = ""
      , d = "success";
    switch (b = 1 == Global_flagPost ? '<i class="sprite sprite-ok"></i>  Пост добавлен в очередь. ' : '<i class="sprite sprite-ok"></i>  Пост опубликован. ',
    a) {
    case "PostClub":
        "vk" == Global_idGroup.SocNetwork ? c = '<a href="https://vk.com/club' + Math.abs(Global_idGroup.idGroup) + '" target="_blank">Посмотреть</a>' : "ok" == Global_idGroup.SocNetwork && (c = '<a href="https://ok.ru/group/' + Math.abs(Global_idGroup.idGroup) + '" target="_blank">Посмотреть</a>');
        break;
    case "PostId":
        "vk" == Global_idGroup.SocNetwork ? c = '<a href="https://vk.com/id' + Math.abs(Global_idGroup.idGroup) + '" target="_blank">Посмотреть</a>' : "ok" == Global_idGroup.SocNetwork && (c = '<a href="https://ok.ru/profile/' + Math.abs(Global_idGroup.idGroup) + '" target="_blank">Посмотреть</a>');
        break;
    case "PostCollection":
        b = "Опубликовано постов: " + Global_success_posts + " из " + Global_count_posts;
        break;
    case "siteAdd":
        b = '<i class="sprite sprite-ok"></i> Пост добавлен в очередь на сайт SmmBox. <a href="https://smmbox.com/autoposting/?social=' + Global_idGroup.SocNetwork + "&list=" + Math.abs(Global_idGroup.idGroup) + "&list_type=" + Global_idGroup.groupType + '" target="_blank">Посмотреть</a>';
        break;
    case "siteEdit":
        b = 'Пост успешно отредактирован. <a href="https://smmbox.com/autoposting/?social=' + Global_idGroup.SocNetwork + "&list=" + Math.abs(Global_idGroup.idGroup) + "&list_type=" + Global_idGroup.groupType + '" target="_blank">Посмотреть</a>';
        break;
    default:
        b = "Ошибка. Попробуйте еще раз.",
        d = "error"
    }
    b += c,
    smmboxPopup.showMessage(b, d),
    Global_buttonBlock = !1
}
function full_form(a) {
    if (Global_masImg = a,
    $("#smmbox_attachments > .list-group-row").html(""),
    init_textarea(),
    a.length > 0 || "" != Global_point) {
        var b = 0;
        storage.get(["AlwaysRemoveHashtag"], function(a) {
            var b = null  == a.AlwaysRemoveHashtag ? a.AlwaysRemoveHashtag : a.AlwaysRemoveHashtag.toString();
            "true" == b && "edit" != Global_type ? DeleteHash() : countHash()
        }
        );
        for (var c = b; c < a.length; c++) {
            var d = ""
              , e = a[c].height
              , f = a[c].width;
            d = f >= e ? "width" : "height";
            var g = a[c].text;
            ("audio" == a[c].type || "poll" == a[c].type || "point" == a[c].type) && (a[c].miniImg = "data/images/" + a[c].type + ".png"),
            (null  == a[c].miniImg || "" == a[c].miniImg) && (a[c].miniImg = ""),
            "fetch_ok" != Global_type && 1 == $("#smmbox_attachments").find(".list-group-item-" + a[c].type).hasClass("hide") && $("#smmbox_attachments").find(".list-group-item-" + a[c].type).removeClass("hide");
            var h = attachmentWidget.prepareTemplate(g, a[c], c, Global_soc);
            $("#smmbox_attachments").append(h),
            $(".scrollbar-macosx").scrollbar()
        }
        if ("" != Global_point) {
            var i = Global_point
              , j = Global_point.name;
            i.type = "point",
            h = attachmentWidget.prepareTemplate(j, i, "", Global_soc),
            $("#smmbox_attachments").append(h)
        }
        (0 != Global_postId || "fetch_img" == Global_type) && $("#smmbox_attachments .overflow_img").addClass("check"),
        "vk" == Global_soc && audioWidget.init(),
        attachmentWidget.checkDisabled()
    } else
        $("#smmbox_attachments").prepend('<p align="center" class="no_attach_text" id="no_attach_text">К этому посту ничего не прикреплено</p>')
}
function GetTimePostponed() {
    if (null  != Global_dataPost) {
        var a = new Date(Global_dataPost.getFullYear(),Global_dataPost.getMonth(),Global_dataPost.getDate(),Global_dataPost.getHours(),Global_dataPost.getMinutes()).getTime() / 1e3
          , b = Math.ceil((new Date).getTime() / 1e3);
        return a >= b ? a + 3600 * Global_TimeUTC : ""
    }
    return ""
}
function ShowCaptcha() {
    $("#showCaptcha").attr("src", Global_wallPostData.error.captcha_img),
    $("#inputCaptcha").val(),
    $("#modalCaptcha").modal("show")
}
function ShowCaptchaPhotocopy() {
    $("#showCaptcha").attr("src", Global_photocopyData.error.captcha_img),
    $("#inputCaptcha").val(),
    $("#modalCaptcha").modal("show")
}
function addAnswer() {
    $("#answerForQuestion").append('<div class="poll-answers__item"><input type="text" name="date" class="form-control input-sm poll-answers__input" placeholder=""><a href="#" class="removeAnswer" tabindex="-1"><span class="sprite sprite-remove"></span></a></div>'),
    $(".removeAnswer").click(function() {
        removeAnswer(this)
    }
    ),
    $('.poll-answers__item:last-of-type input[type="text"]').focus()
}
function removeAnswer(a) {
    $(a).parent(".poll-answers__item").remove()
}
function TimeUTC(a) {
    Global_TimeUTC = a;
    var b = new Date;
    Global_TimeUTC = Math.round((Global_TimeUTC - b.getTime() / 1e3) / 3600)
}
function bytesToSize(a) {
    if (0 == a)
        return "0 Byte";
    var b = 1e3
      , c = ["Bytes", "Kb", "Mb", "Gb", "Tb", "Pb", "Eb", "Zb", "Yb"]
      , d = Math.floor(Math.log(a) / Math.log(b));
    return (a / Math.pow(b, d)).toPrecision(3) + " " + c[d]
}
function getUserInfo(a) {
    void 0 != a ? (Global_postId = a,
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "https://smmbox.com/popup/islogin.php",
        data: {},
        success: function(a) {
            if (console.log("SmmBox: get user info finish"),
            "no" == a.error) {
                void 0 != a.social_data.vk && (social_dataG.vk.isconnected = !0,
                social_dataG.vk.uid = a.social_data.vk.id,
                social_dataG.vk.token = a.social_data.vk.token,
                social_dataG.vk.photo = a.social_data.vk.photo,
                social_dataG.vk.groups = a.social_data.vk.groups,
                social_dataG.vk.groups_shared = a.social_data.vk.groups_shared,
                social_dataG.vk.watermarks = a.social_data.vk.watermarks),
                void 0 != a.social_data.ok && (social_dataG.ok.isconnected = !0,
                social_dataG.ok.uid = a.social_data.ok.id,
                social_dataG.ok.token = a.social_data.ok.token,
                social_dataG.ok.photo = a.social_data.ok.photo,
                social_dataG.ok.groups = a.social_data.ok.groups,
                social_dataG.ok.groups_shared = a.social_data.ok.groups_shared,
                social_dataG.ok.watermarks = a.social_data.ok.watermarks),
                void 0 != a.collections && (smmboxCollections = a.collections),
                Global_expireunlim = a.expireunlim,
                Global_postponed_limit = a.postponed_limit,
                TimeUTC(a.time),
                Global_editable = !1;
                var b, c, d;
                if (storage.set({
                    vkuid: social_dataG.vk.uid,
                    vk_groups: social_dataG.vk.groups,
                    okuid: social_dataG.ok.uid,
                    ok_groups: social_dataG.ok.groups
                }),
                Global_expireunlim - moment().unix() < 0 && (Global_expireunlim = 0),
                0 == Global_expireunlim) {
                    b = 0 == a.pay ? "Тестовый период закончился" : "Оплаченный период закончился",
                    d = "",
                    social_dataG.vk.groups = social_dataG.vk.groups_shared,
                    social_dataG.ok.groups = social_dataG.ok.groups_shared;
                    for (var e = [], f = 0; f < smmboxCollections.length; f++) {
                        for (var g = 0, h = 0; h < smmboxCollections[f].items.length; h++)
                            "vk" == smmboxCollections[f].items[h].social && social_dataG.vk.groups_shared.indexOf(smmboxCollections[f].items[h].id) >= 0 ? g++ : "ok" == smmboxCollections[f].items[h].social && social_dataG.ok.groups_shared.indexOf(smmboxCollections[f].items[h].id) >= 0 && g++;
                        smmboxCollections[f].items.length == g && e.push(smmboxCollections[f])
                    }
                    smmboxCollections = e
                } else
                    0 == a.pay ? (b = "Тестовый период закончится ",
                    d = moment.unix(Global_expireunlim).fromNow()) : (c = Global_expireunlim - a.time,
                    604800 >= c ? (b = "Оплаченный период закончится ",
                    d = moment.unix(Global_expireunlim).fromNow()) : (b = "Оплаченный период до ",
                    d = moment.unix(Global_expireunlim).format("DD.MM.YYYY")));
                if ("" == d && 0 == social_dataG.vk.groups_shared.length && 0 == social_dataG.ok.groups_shared.length)
                    return $("#loader").hide(),
                    $("#advertisement .lead").html(b),
                    void $("#advertisement").show();
                if ($("#InfoColpost").text(b),
                $(".smmbox_limit").text(d),
                $("#PriceOpen").html("Продлить"),
                Global_expireunlim - moment().unix() < 432e3 ? $(".sprite-attention").show() : $(".sprite-attention").hide(),
                1 == social_dataG.vk.isconnected) {
                    if ((null  == social_dataG.vk.token_standalone || void 0 == social_dataG.vk.token_standalone) && "extension" == Global_source)
                        return void smmboxError.showError(3, "global");
                    if ("" == social_dataG.vk.token)
                        return void smmboxError.showError(1, "global");
                    "extension" == Global_source && ($.ajax({
                        type: "POST",
                        dataType: "json",
                        url: "https://api.vk.com/method/groups.get?extended=1&filter=editor&v=5.37&https=1&count=1000&access_token=" + social_dataG.vk.token,
                        data: {},
                        success: function(a) {
                            void 0 != a.error && smmboxError.showError(4, "global")
                        }
                    }),
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: "https://api.vk.com/method/users.get?access_token=" + social_dataG.vk.token_standalone,
                        data: {},
                        success: function(a) {
                            a.response[0].uid != social_dataG.vk.uid && smmboxError.showError(31, "global")
                        }
                    }))
                }
                if (Global_type.indexOf("_ok") > 0 && !social_dataG.ok.token)
                    return void smmboxError.showError(5, "global");
                "edit" != Global_type && socManager.getGroupsInfo(),
                socManager.getPostInfo()
            } else
                smmboxError.showError(1, "global")
        },
        error: function(a) {
            smmboxError.showError("Ошибка соединения с сайтом smmbox.com. Попробуйте позже", "internal")
        }
    })) : smmboxError.showError(2, "global")
}
function SendPost() {
    Global_limit > 0 || Global_expireunlim > 0 || "fetch_vk_suggest" == Global_type || social_dataG.vk.groups_shared.length > 0 || social_dataG.ok.groups_shared.length > 0 ? 0 == Global_buttonBlock ? (Global_buttonBlock = !0,
    smmboxError.clearError(),
    storage.set({
        Global_Lastgroup: Global_idGroup.idGroup + "T" + Global_idGroup.SocNetwork
    }),
    socManager.setPost()) : console.log("Кнопка заблокирована!") : smmboxError.showError("PostLimit", "internal")
}
function AddPostToSite() {
    "vk" == Global_soc && "" == Global_idGroupFrom && 0 != Global_postId && (Global_idGroupFrom = Global_postId.split("_")[0],
    Global_postId = Global_postId.split("_")[1]);
    var a;
    "vk" == Global_idGroup.groupsPosting[0].soc ? a = Global_arrayAttachmentsOrigVK : "ok" == Global_idGroup.groupsPosting[0].soc && (a = Global_arrayAttachmentsOrig),
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "https://smmbox.com/autoposting/add.php",
        data: {
            Global_idGroup: Global_idGroup.groupsPosting[0].id,
            Global_groupType: Global_idGroup.groupsPosting[0].type,
            Global_postId: Global_postId,
            Version: Global_version,
            publish_date: Global_publish_date,
            Global_arrayAttachmentsOrig: a,
            Global_fromGroup: Global_fromGroup,
            Global_signed: Global_signed,
            Global_point: Global_point,
            Global_source: Global_source,
            social_from: Global_soc,
            social_to: Global_idGroup.groupsPosting[0].soc,
            idGroupFrom: Global_idGroupFrom,
            Global_checkWmrk: Global_checkWmrk
        },
        success: function(a) {
            console.log("SmmBox: add post to site finish"),
            smmboxPopup.updatePopupAfterPost(a)
        },
        error: function(a) {
            smmboxError.showError("Ошибка при соединении с сайтом smmbox.com. Попробуйте позже.", "internal")
        }
    })
}
function SendEditPostOnSite() {
    Global_publish_date = null  != Global_dataPost ? moment(Global_dataPost).unix() : moment().unix() + 300,
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "https://smmbox.com/autoposting/edit.php",
        data: {
            Global_idGroup: Global_idGroup.groupsPosting[0].id,
            Global_groupType: Global_idGroup.groupsPosting[0].type,
            Global_postId: Global_postId,
            Version: Global_version,
            publish_date: Global_publish_date,
            Global_arrayAttachmentsOrig: Global_arrayAttachmentsOrig,
            Global_fromGroup: Global_fromGroup,
            Global_signed: Global_signed,
            Global_point: Global_point,
            Global_source: Global_source,
            editablepost: Global_editable_post_id
        },
        success: function(a) {
            console.log("SmmBox: edit post to site finish"),
            smmboxPopup.updatePopupAfterPost(a)
        },
        error: function(a) {
            smmboxError.showError("Ошибка при соединении с сайтом smmbox.com. Попробуйте позже.", "internal")
        }
    })
}
function SetSuccessPostLog() {
    "vk" == Global_soc && "" == Global_idGroupFrom && 0 != Global_postId && (Global_idGroupFrom = Global_postId.split("_")[0],
    Global_postId = Global_postId.split("_")[1]),
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "https://smmbox.com/popup/webpostlog.php",
        data: {
            Global_idGroup: Global_idGroup.groupsPosting[0].id,
            Global_groupType: Global_idGroup.groupsPosting[0].type,
            Global_postId: Global_postId,
            Version: Global_version,
            Global_source: Global_source,
            Photos_count: Global_photos_count,
            social_from: Global_soc,
            social_to: Global_idGroup.groupsPosting[0].soc,
            idGroupFrom: Global_idGroupFrom
        },
        success: function(a) {
            console.log("SmmBox: web post log finish"),
            smmboxPopup.updatePopupAfterPost(a)
        },
        error: function(a) {
            smmboxError.showError("Ошибка с соединением с сайтом smmbox.com. Попробуйте позже", "internal")
        }
    })
}
function getPostAttachVk(a) {
    var b = [];
    if (1 == Array.isArray(a.response)) {
        var c;
        for (i = 0; i < a.response.length; i++)
            d = a.response[i],
            c = void 0 !== d.photo_2560 ? d.photo_2560 : void 0 !== d.photo_1280 ? d.photo_1280 : void 0 !== d.photo_807 ? d.photo_807 : void 0 !== d.photo_604 ? d.photo_604 : d.photo_130,
            b.push({
                miniImg: d.photo_130,
                height: 20,
                width: 40,
                id: "photo" + d.owner_id + "_" + d.id,
                type: "photo",
                text: d.width + "x" + d.height,
                accessKey: "",
                origImg: c,
                desktopImg: "0"
            });
        Global_through_site = !0
    } else {
        if ($("#smmbox_text").val(a.response.items[0].text),
        void 0 !== a.response.items[0].attachments)
            for (i = 0; i < a.response.items[0].attachments.length; i++) {
                var d = a.response.items[0].attachments[i];
                switch (d.type) {
                case "photo":
                    var c;
                    c = void 0 !== d.photo.photo_2560 ? d.photo.photo_2560 : void 0 !== d.photo.photo_1280 ? d.photo.photo_1280 : void 0 !== d.photo.photo_807 ? d.photo.photo_807 : void 0 !== d.photo.photo_604 ? d.photo.photo_604 : d.photo.photo_130,
                    b.push({
                        miniImg: d.photo.photo_130,
                        height: 20,
                        width: 40,
                        id: "photo" + d.photo.owner_id + "_" + d.photo.id,
                        type: d.type,
                        text: d.photo.width + "x" + d.photo.height,
                        accessKey: d.photo.access_key,
                        origImg: c,
                        desktopImg: "0"
                    });
                    break;
                case "doc":
                    b.push({
                        miniImg: d.doc.photo_130,
                        height: 20,
                        width: 40,
                        id: "doc" + d.doc.owner_id + "_" + d.doc.id,
                        type: d.type,
                        text: d.doc.title,
                        accessKey: "",
                        origImg: d.doc.url,
                        desktopImg: "0",
                        ext: d.doc.ext,
                        size: d.doc.size
                    });
                    break;
                case "video":
                    b.push({
                        miniImg: d.video.photo_130,
                        height: 20,
                        width: 40,
                        id: "video" + d.video.owner_id + "_" + d.video.id,
                        type: d.type,
                        text: d.video.title,
                        accessKey: d.video.access_key,
                        origImg: "",
                        desktopImg: "0",
                        duration: d.video.duration
                    });
                    break;
                case "album":
                    var e = "Альбом";
                    "" != d.album.title && (e = "Альбом: " + d.album.title),
                    b.push({
                        miniImg: d.album.thumb.photo_75,
                        height: 20,
                        width: 40,
                        id: "album" + d.album.owner_id + "_" + d.album.id,
                        type: d.type,
                        text: e,
                        accessKey: "",
                        origImg: "",
                        desktopImg: "0"
                    });
                    break;
                case "audio":
                    b.push({
                        miniImg: d.audio.url,
                        height: 20,
                        width: 40,
                        id: "audio" + d.audio.owner_id + "_" + d.audio.id,
                        type: d.type,
                        text: d.audio.artist + " - " + d.audio.title,
                        accessKey: "",
                        origImg: "",
                        desktopImg: "0",
                        duration: d.audio.duration,
                        url: d.audio.url
                    });
                    break;
                case "poll":
                    var f = 1 == d.poll.anonymous ? ["SingleChoice", "AnonymousVoting"] : ["SingleChoice"];
                    b.push({
                        miniImg: "poll",
                        height: 20,
                        width: 40,
                        id: "poll" + d.poll.owner_id + "_" + d.poll.id,
                        type: d.type,
                        text: d.poll.question,
                        accessKey: "",
                        origImg: "",
                        desktopImg: "0",
                        answers: d.poll.answers,
                        options: f
                    });
                    break;
                case "link":
                    b.push({
                        miniImg: d.link.image_src,
                        height: 20,
                        width: 40,
                        id: d.link.url,
                        type: d.type,
                        text: d.link.title,
                        accessKey: "",
                        origImg: "",
                        desktopImg: "0",
                        description: d.link.description,
                        url: d.link.url
                    });
                    break;
                case "page":
                    b.push({
                        miniImg: "urlImg",
                        height: 20,
                        width: 40,
                        id: "page-" + d.page.group_id + "_" + d.page.id,
                        type: d.type,
                        text: d.page.title,
                        accessKey: "",
                        origImg: "",
                        desktopImg: "0"
                    })
                }
            }
        if (void 0 !== a.response.items[0].geo) {
            var d = a.response.items[0].geo;
            Global_point = {
                id: d.place.id,
                lat: d.coordinates.split(" ")[0],
                lng: d.coordinates.split(" ")[1],
                name: d.place.title,
                category: "town",
                string: "&lat=" + d.coordinates.split(" ")[0] + "&long=" + d.coordinates.split(" ")[1] + "&place_id=" + d.place.id
            }
        }
    }
    full_form(b)
}
function findaudioVk() {
    var a = $("#addpost_audio_query").val();
    Global_MyAOrGrV = !0,
    $("#link_MyAudio").text("Перейти к моим аудиозаписям"),
    $("#link_MyAudio").show(),
    void 0 != jscrollBlocks.audioResultPane ? (jscrollBlocks.audioResultPane.getContentPane().html("<p>Поиск...</p>"),
    jscrollBlocks.audioResultPane.reinitialise()) : $("#addpost_audio_result").append("<p>Поиск...</p>");
    var b = "https://api.vk.com/method/audio.get?v=5.14&count=100&https=1&owner_id=" + Global_idGroup.idGroup + "&access_token=";
    "" != a && (b = "https://api.vk.com/method/audio.search?q=" + a + "&v=5.14&count=100&access_token="),
    "site" == Global_source ? (b += social_dataG.vk.token,
    $.ajax({
        type: "POST",
        dataType: "jsonp",
        crossDomain: !0,
        url: b,
        data: {},
        success: function(a) {
            findaudioVkSuccess(a)
        }
    })) : (b += social_dataG.vk.token_standalone,
    $.ajax({
        type: "POST",
        dataType: "json",
        url: b,
        data: {},
        success: function(a) {
            findaudioVkSuccess(a)
        }
    }))
}
function findaudioVkSuccess(a) {
    var b = "";
    if (void 0 != a.response)
        if (a.response.items.length > 0)
            for (var c = 0; c < a.response.items.length; c++)
                b = b + '<div class="search-result__item"><a href="#" class="searchaddattach" data-audio="audio" data-id="audio' + a.response.items[c].owner_id + "_" + a.response.items[c].id + '" data-title="' + a.response.items[c].artist + " - " + a.response.items[c].title + '" data-duration="' + a.response.items[c].duration + '" data-url="' + a.response.items[c].url + '"><span class="fa fa-plus-circle"></span></a> <b>' + a.response.items[c].artist + "</b> - " + a.response.items[c].title + "</div>";
        else
            b = "Аудиозаписей в группе нет.";
    else
        b = "Аудиозаписей в группе нет.";
    void 0 != jscrollBlocks.audioResultPane ? (jscrollBlocks.audioResultPane.getContentPane().html(b),
    jscrollBlocks.audioResultPane.reinitialise(),
    $(".searchaddattach").click(function() {
        var a = {
            preview: "",
            id: $(this).attr("data-id"),
            type: $(this).attr("data-audio"),
            title: $(this).attr("data-title"),
            original: "url",
            BoollDesktop: "0",
            duration: $(this).data("duration"),
            url: $(this).data("url")
        };
        attachmentWidget.addAttach(a),
        $("#addpost_audio").modal("hide")
    }
    )) : $("#addpost_audio_result").append(b)
}
function getMyaudioVk() {
    var a = ($("#addpost_audio_query").val(),
    "");
    void 0 != jscrollBlocks.audioResultPane ? (jscrollBlocks.audioResultPane.getContentPane().html("<p>Поиск...</p>"),
    jscrollBlocks.audioResultPane.reinitialise()) : $("#addpost_audio_result").append("<p>Поиск...</p>"),
    void 0 != Global_idGroup.collection.id && (Global_MyAOrGrV = !0,
    $("#link_MyAudio").hide()),
    1 == Global_MyAOrGrV ? ($("#link_MyAudio").text("Перейти к аудиозаписям группы"),
    Global_MyAOrGrV = !1,
    a = "https://api.vk.com/method/audio.get?v=5.14&count=100&https=1&access_token=") : ($("#link_MyAudio").text("Перейти к моим аудиозаписям"),
    Global_MyAOrGrV = !0,
    a = "https://api.vk.com/method/audio.get?v=5.14&count=100&https=1&owner_id=" + Global_idGroup.idGroup + "&access_token="),
    "site" == Global_source ? (a += social_dataG.vk.token,
    $.ajax({
        type: "POST",
        dataType: "jsonp",
        crossDomain: !0,
        url: a,
        data: {},
        success: function(a) {
            getMyaudioVkSuccess(a)
        }
    })) : (a += social_dataG.vk.token_standalone,
    $.ajax({
        type: "POST",
        dataType: "json",
        url: a,
        data: {},
        success: function(a) {
            getMyaudioVkSuccess(a)
        }
    }))
}
function getMyaudioVkSuccess(a) {
    var b = "";
    if (void 0 != a.response)
        if (a.response.items.length > 0) {
            var b = "";
            jscrollBlocks.audioResultPane.reinitialise();
            for (var c = 0; c < a.response.items.length; c++)
                a.response.items[c].title.length > 36 ? name = a.response.items[c].title.substr(0, 36) + "..." : name = a.response.items[c].title,
                b = b + '<div class="search-result__item"><a href="#" class="searchaddattach" data-audio="audio" data-id="audio' + a.response.items[c].owner_id + "_" + a.response.items[c].id + '" data-title="' + a.response.items[c].artist + " - " + a.response.items[c].title + '" data-duration="' + a.response.items[c].duration + '" data-url="' + a.response.items[c].url + '"><span class="fa fa-plus-circle"></span></a> <b>' + a.response.items[c].artist + "</b> - " + a.response.items[c].title + "</div>"
        } else
            b = "Аудиозаписей в группе нет.";
    else
        b = "Аудиозаписей в группе нет.";
    void 0 != jscrollBlocks.audioResultPane ? (jscrollBlocks.audioResultPane.getContentPane().html(b),
    jscrollBlocks.audioResultPane.reinitialise(),
    $(".searchaddattach").click(function() {
        var a = {
            preview: "",
            id: $(this).attr("data-id"),
            type: $(this).attr("data-audio"),
            title: $(this).attr("data-title"),
            original: "url",
            BoollDesktop: "0",
            duration: $(this).data("duration"),
            url: $(this).data("url")
        };
        attachmentWidget.addAttach(a),
        $("#addpost_audio").modal("hide")
    }
    )) : $("#addpost_audio_result").append(b)
}
function findvideoVk() {
    var a = $("#addpost_video_query").val()
      , b = "https://api.vk.com/method/video.get?v=5.14&count=100&owner_id=" + Global_idGroup.idGroup + "&https=1&access_token=";
    Global_MyVOrGrV = !0,
    $("#link_MyVideo").text("Перейти к моим видеозаписям"),
    $("#link_MyVideo").show(),
    void 0 != jscrollBlocks.audioResultPane ? (jscrollBlocks.audioResultPane.getContentPane().html("<p>Поиск...</p>"),
    jscrollBlocks.audioResultPane.reinitialise()) : $("#addpost_video_result").append("<p>Поиск...</p>"),
    "" != a && (b = "https://api.vk.com/method/video.search?q=" + a + "&v=5.14&count=100&access_token="),
    "site" == Global_source ? (b += social_dataG.vk.token,
    $.ajax({
        type: "POST",
        dataType: "jsonp",
        crossDomain: !0,
        url: b,
        data: {},
        success: function(a) {
            findvideoVkSuccess(a)
        }
    })) : (b += social_dataG.vk.token_standalone,
    $.ajax({
        type: "POST",
        dataType: "json",
        url: b,
        data: {},
        success: function(a) {
            findvideoVkSuccess(a)
        }
    }))
}
function findvideoVkSuccess(a) {
    var b = "";
    if (void 0 != a.response)
        if (a.response.items.length > 0)
            for (var c = 0; c < a.response.items.length; c++)
                a.response.items[c].title.length > 36 ? name = a.response.items[c].title.substr(0, 36) + "..." : name = a.response.items[c].title,
                b = b + '<div class="search-result__item" title="' + a.response.items[c].title + '"><img src="' + a.response.items[c].photo_320 + '" width="210" height="158" class="searchaddattach" data-video="video" data-id="video' + a.response.items[c].owner_id + "_" + a.response.items[c].id + '" data-title="' + a.response.items[c].title + '" data-photo="' + a.response.items[c].photo_130 + '" data-duration="' + a.response.items[c].duration + '"> <div style="background-image: url(data/images/video_search_back.png); padding: 4px; color: #ffffff; font-size: 11px; position: relative; top: -22px;">' + name + "</div></div>";
        else
            b = "Видеозаписей в группе нет.";
    else
        b = "Видеозаписей в группе нет.";
    void 0 != jscrollBlocks.videoResultPane ? (jscrollBlocks.videoResultPane.getContentPane().html(b),
    jscrollBlocks.videoResultPane.reinitialise(),
    $(".searchaddattach").click(function() {
        var a = {
            preview: $(this).attr("data-photo"),
            id: $(this).attr("data-id"),
            type: $(this).attr("data-video"),
            title: $(this).attr("data-title"),
            original: "url",
            BoollDesktop: "0",
            duration: $(this).data("duration")
        };
        attachmentWidget.addAttach(a),
        $("#addpost_video").modal("hide")
    }
    )) : $("#addpost_video_result").append(b)
}
function getMyvideoVk() {
    var a = "";
    if (void 0 != jscrollBlocks.audioResultPane ? (jscrollBlocks.audioResultPane.getContentPane().html("<p>Поиск...</p>"),
    jscrollBlocks.audioResultPane.reinitialise()) : $("#addpost_video_result").append("<p>Поиск...</p>"),
    void 0 != Global_idGroup.collection.id && (Global_MyVOrGrV = !0,
    $("#link_MyVideo").hide()),
    1 == Global_MyVOrGrV) {
        $("#link_MyVideo").text("Перейти к видеозаписям группы"),
        Global_MyVOrGrV = !1;
        var a = "https://api.vk.com/method/video.get?v=5.14&count=100&https=1&access_token="
    } else {
        Global_MyVOrGrV = !0,
        $("#link_MyVideo").text("Перейти к моим видеозаписям");
        var a = "https://api.vk.com/method/video.get?v=5.14&count=100&https=1&owner_id=" + Global_idGroup.idGroup + "&access_token="
    }
    "site" == Global_source ? (a += social_dataG.vk.token,
    $.ajax({
        type: "POST",
        dataType: "jsonp",
        crossDomain: !0,
        url: a,
        data: {},
        success: function(a) {
            getMyvideoVkSuccess(a)
        }
    })) : (a += social_dataG.vk.token_standalone,
    $.ajax({
        type: "POST",
        dataType: "json",
        url: a,
        data: {},
        success: function(a) {
            getMyvideoVkSuccess(a)
        }
    }))
}
function getMyvideoVkSuccess(a) {
    var b = "";
    if (void 0 != a.response)
        if (a.response.items.length > 0)
            for (var c = 0; c < a.response.items.length; c++)
                a.response.items[c].title.length > 36 ? name = a.response.items[c].title.substr(0, 36) + "..." : name = a.response.items[c].title,
                b = b + '<div class="search-result__item" title="' + a.response.items[c].title + '"><img src="' + a.response.items[c].photo_320 + '" width="210" height="158" class="searchaddattach" data-video="video" data-id="video' + a.response.items[c].owner_id + "_" + a.response.items[c].id + '" data-title="' + a.response.items[c].title + '" data-photo="' + a.response.items[c].photo_130 + '" data-duration="' + a.response.items[c].duration + '"> <div style="background-image: url(data/images/video_search_back.png); padding: 4px; color: #ffffff; font-size: 11px; position: relative; top: -22px;">' + name + "</div></div>";
        else
            b = "Видеозаписей в группе нет.";
    else
        b = "Видеозаписей в группе нет.";
    void 0 != jscrollBlocks.videoResultPane ? (jscrollBlocks.videoResultPane.getContentPane().html(b),
    jscrollBlocks.videoResultPane.reinitialise(),
    $(".searchaddattach").click(function() {
        var a = {
            preview: $(this).attr("data-photo"),
            id: $(this).attr("data-id"),
            type: $(this).attr("data-video"),
            title: $(this).attr("data-title"),
            original: "url",
            BoollDesktop: "0",
            duration: $(this).data("duration")
        };
        attachmentWidget.addAttach(a),
        $("#addpost_video").modal("hide")
    }
    )) : $("#addpost_video_result").append(b)
}
function setPostVk() {
    if (Global_fromGroup = $("#CheckAdmin").is(":checked") ? "1" : "0",
    Global_signed = $("#CheckSign").is(":checked") ? "1" : "0",
    0 == Global_idGroup.idGroup)
        alert("Выберите группу");
    else {
        for (var a, b, c = !1, d = 0, e = 0, f = 0; f < Global_arrayAttachmentsVK.length; f++)
            if ("poll" == Global_arrayAttachmentsVK[f][3] && "" == Global_arrayAttachmentsVK[f][0]) {
                c = !0,
                d = f,
                a = Global_arrayAttachmentsVK[f][6],
                b = [];
                for (var g = 0; g < Global_arrayAttachmentsVK[f][7].length; g++)
                    b.push('"' + Global_arrayAttachmentsVK[f][7][g].text + '"');
                Global_arrayAttachmentsVK[f][8].indexOf("AnonymousVoting") >= 0 && (e = 1)
            }
        1 == c ? addPostquestionVk(e, a, b, d) : setPostVkStart()
    }
}
function addPostquestionVk(a, b, c, d) {
    "" != b && c.length >= 1 && ("site" == Global_source ? $.ajax({
        type: "GET",
        dataType: "jsonp",
        crossDomain: !0,
        url: "https://api.vk.com/method/polls.create?v=5.21&is_anonymous=" + a + "&access_token=" + social_dataG.vk.token,
        data: {
            question: b,
            owner_id: Global_idGroup.groupsPosting[0].id,
            add_answers: "[" + c.join(",") + "]"
        },
        success: function(a) {
            addPostquestionVkSuccess(a, d)
        },
        error: function(a) {
            smmboxError.showError("ErrorCreatePoll", "internal")
        }
    }) : $.ajax({
        type: "POST",
        dataType: "json",
        url: "https://api.vk.com/method/polls.create?v=5.21&is_anonymous=" + a + "&access_token=" + social_dataG.vk.token_standalone,
        data: {
            question: b,
            owner_id: Global_idGroup.groupsPosting[0].id,
            add_answers: "[" + c.join(",") + "]"
        },
        success: function(a) {
            addPostquestionVkSuccess(a, d)
        },
        error: function(a) {
            smmboxError.showError("ErrorCreatePoll", "internal")
        }
    }))
}
function addPostquestionVkSuccess(a, b) {
    Global_vk_newpoll = !0,
    Global_arrayAttachmentsVK[b][0] = "poll" + a.response.owner_id + "_" + a.response.id,
    Global_arrayAttachmentsOrigVK[b][0] = "poll" + a.response.owner_id + "_" + a.response.id,
    setPostVkStart()
}
function setPostVkStart() {
    if (Global_PostVk[Global_idGroup.groupsPosting[0].id.toString()] >= Global_postponed_limit && 1 == Global_flagPost) {
        var a = !0;
        if (0 == Global_vk_newpoll) {
            var b, c;
            for (i = 0; i < Global_arrayAttachmentsVK.length; i++)
                if ("poll" == Global_arrayAttachmentsVK[i][3]) {
                    b = Global_arrayAttachmentsVK[i][0].replace("poll", ""),
                    c = b.split("_"),
                    "site" == Global_source ? $.ajax({
                        type: "GET",
                        dataType: "jsonp",
                        crossDomain: !0,
                        cache: !1,
                        url: "https://api.vk.com/method/execute.createpoll",
                        data: {
                            owner_id: c[0],
                            poll_id: c[1],
                            gid: Global_idGroup.groupsPosting[0].id,
                            access_token: social_dataG.vk.token
                        },
                        success: function(a) {
                            Global_arrayAttachmentsVK[i][0] = a.response,
                            Global_arrayAttachmentsOrigVK[i][0] = a.response,
                            AddPostToSite()
                        }
                    }) : $.ajax({
                        type: "POST",
                        dataType: "json",
                        cache: !1,
                        url: "https://api.vk.com/method/execute.createpoll",
                        data: {
                            owner_id: c[0],
                            poll_id: c[1],
                            gid: Global_idGroup.groupsPosting[0].id,
                            access_token: social_dataG.vk.token_standalone
                        },
                        success: function(a) {
                            Global_arrayAttachmentsVK[i][0] = a.response,
                            Global_arrayAttachmentsOrigVK[i][0] = a.response,
                            AddPostToSite()
                        }
                    }),
                    a = !1;
                    break
                }
        }
        a && AddPostToSite()
    } else
        Global_BoollLink || Global_editable || "ok" == Global_soc || 1 == Global_through_site || "site" == Global_source || "fetch_site" == Global_type || "fetch_img" == Global_type || 1 == Global_checkWmrk && social_dataG.vk.watermarks.indexOf(Global_idGroup.groupsPosting[0].id) >= 0 ? getAttachOrWmrk() : PrepareMasVk()
}
function PrepareMasVk() {
    for (var a, b = [], c = 0; c < Global_arrayAttachmentsVK.length; c++)
        if (Global_arrayAttachmentsVK[c][0].indexOf("photo") >= 0 && "1" != Global_arrayAttachmentsVK[c][4]) {
            var d = Global_arrayAttachmentsVK[c][0].replace("photo", "");
            d = d.split("_"),
            b.push(d[0]),
            b.push(d[1]),
            b.push(Global_arrayAttachmentsVK[c][1]),
            b.push(c),
            Global_photos_count++
        }
    $.ajax({
        type: "POST",
        dataType: "json",
        cache: !1,
        url: "https://api.vk.com/method/execute.photocopy",
        data: {
            list: b,
            access_token: social_dataG.vk.token_standalone,
            captcha_sid: Global_captcha_sid,
            captcha_key: Global_captcha_key
        },
        success: function(b) {
            if (Global_photocopyData = b,
            void 0 != b.error)
                return 14 == b.error.error_code ? (Global_captcha_sid = "",
                Global_captcha_key = "",
                smmboxError.showError("captchaNeededPhotocopy", "internal"),
                0) : (smmboxError.showError("ErrorPhotoCopy", "internal"),
                0);
            if (void 0 != b.execute_errors)
                return 15 == b.execute_errors[0].error_code ? (Global_through_site = !0,
                setPostVk(),
                0) : (smmboxError.showError("ErrorPhotoCopy", "internal"),
                0);
            if ("" != b.response)
                for (a = b.response.split(","),
                c = 0; c < a.length; c += 2)
                    "" == a[c + 1] && (a[c + 1] = c),
                    Global_arrayAttachmentsVK[a[c + 1]][0] = "photo" + social_dataG.vk.uid + "_" + a[c],
                    Global_imgAlbumDelete.push("photo" + social_dataG.vk.uid + "_" + a[c]);
            NullOprosVk()
        }
    })
}
function NullOprosVk() {
    var a, b, c = !0;
    if (0 == Global_vk_newpoll)
        for (i = 0; i < Global_arrayAttachmentsVK.length; i++)
            if ("poll" == Global_arrayAttachmentsVK[i][3]) {
                a = Global_arrayAttachmentsVK[i][0].replace("poll", ""),
                b = a.split("_"),
                "site" == Global_source ? $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    crossDomain: !0,
                    cache: !1,
                    url: "https://api.vk.com/method/execute.createpoll",
                    data: {
                        owner_id: b[0],
                        poll_id: b[1],
                        gid: Global_idGroup.groupsPosting[0].id,
                        access_token: social_dataG.vk.token
                    },
                    success: function(a) {
                        NullOprosVkSuccess(a, i)
                    }
                }) : $.ajax({
                    type: "POST",
                    dataType: "json",
                    cache: !1,
                    url: "https://api.vk.com/method/execute.createpoll",
                    data: {
                        owner_id: b[0],
                        poll_id: b[1],
                        gid: Global_idGroup.groupsPosting[0].id,
                        access_token: social_dataG.vk.token_standalone
                    },
                    success: function(a) {
                        NullOprosVkSuccess(a, i)
                    }
                }),
                c = !1;
                break
            }
    c && WallPostVk()
}
function NullOprosVkSuccess(a, b) {
    Global_arrayAttachmentsVK[b][0] = a.response,
    Global_arrayAttachmentsOrigVK[b][0] = a.response,
    WallPostVk()
}
function checkVkapiOrJsonp(a, b, c) {
    var d = encodeURIComponent(a + b + c)
      , e = "vkapi";
    return d.length < 850 && (e = "jsonp"),
    e
}
function WallPostVk() {
    var a = ""
      , b = []
      , c = 0;
    if ("text" == Global_arrayAttachmentsVK[0][3] && (a = Global_arrayAttachmentsVK[0][6],
    c = 1),
    null  != Global_arrayAttachmentsVK)
        for (i = c; i < Global_arrayAttachmentsVK.length; i++)
            "link" == Global_arrayAttachmentsVK[i][3] ? 0 == Global_arrayAttachmentsVK[i][0].indexOf("http://") ? b.push("http://" + punycode.toASCII(Global_arrayAttachmentsVK[i][0].replace("http://", ""))) : 0 == Global_arrayAttachmentsVK[i][0].indexOf("https://") ? b.push("https://" + punycode.toASCII(Global_arrayAttachmentsVK[i][0].replace("https://", ""))) : b.push(punycode.toASCII(Global_arrayAttachmentsVK[i][0])) : b.push(Global_arrayAttachmentsVK[i][0]);
    if ("fetch_vk_suggest" == Global_type) {
        var d = Global_postId.split("_");
        d = "&post_id=" + d[1]
    } else
        var d = "";
    if (1 == Global_editable)
        SearchHash(),
        setTimeout(SendEditPostOnSite, 350);
    else if (Global_postponed_limit > Global_PostVk[Global_idGroup.groupsPosting[0].id.toString()] || "fetch_vk_suggest" == Global_type || 0 == Global_flagPost || "" == Global_publish_date)
        if ("site" == Global_source) {
            var e = "captcha_sid=" + Global_captcha_sid + "&captcha_key=" + Global_captcha_key + "&owner_id=" + Global_idGroup.groupsPosting[0].id + "&publish_date=" + Global_publish_date + "&from_group=" + Global_fromGroup + "&signed=" + Global_signed + "&v=5.7" + Global_point.string + "&access_token=" + social_dataG.vk.token;
            "jsonp" == checkVkapiOrJsonp(e, a, b.join(",")) ? $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "https://api.vk.com/method/wall.post?captcha_sid=" + Global_captcha_sid + "&captcha_key=" + Global_captcha_key + "&owner_id=" + Global_idGroup.groupsPosting[0].id + "&publish_date=" + Global_publish_date + "&from_group=" + Global_fromGroup + "&signed=" + Global_signed + "&v=5.7" + Global_point.string + "&access_token=" + social_dataG.vk.token,
                crossDomain: !0,
                data: {
                    message: a,
                    attachments: b.join(",")
                },
                success: function(a) {
                    WallPostVkSuccess(a)
                },
                error: function(a) {
                    smmboxError.showError("ErrorPostVk", "internal")
                }
            }) : $.ajax({
                type: "POST",
                dataType: "json",
                url: "https://smmbox.com/popup/postnow.php",
                data: {
                    query: e,
                    message: a,
                    attachments: b.join(",")
                },
                success: function(a) {
                    WallPostVkSuccess(a)
                },
                error: function(a) {
                    smmboxError.showError("ErrorPostVk", "internal")
                }
            })
        } else
            $.ajax({
                type: "POST",
                dataType: "json",
                url: "https://api.vk.com/method/wall.post?captcha_sid=" + Global_captcha_sid + "&captcha_key=" + Global_captcha_key + "&owner_id=" + Global_idGroup.groupsPosting[0].id + "&publish_date=" + Global_publish_date + "&from_group=" + Global_fromGroup + "&signed=" + Global_signed + "&v=5.7" + Global_point.string + d + "&access_token=" + social_dataG.vk.token_standalone,
                data: {
                    message: a,
                    attachments: b.join(",")
                },
                success: function(a) {
                    WallPostVkSuccess(a)
                },
                error: function(a) {
                    smmboxError.showError("ErrorPostVk", "internal")
                }
            });
    else
        setTimeout(afterPostVk, 350)
}
function WallPostVkSuccess(a) {
    Global_wallPostData = a,
    Global_captcha_sid = "",
    Global_captcha_key = "",
    console.log("SmmBox: wall post VK finish"),
    setTimeout(afterPostVk, 350)
}
function afterPostVk() {
    if (SearchHash(),
    "" != Global_wallPostData)
        if (void 0 != Global_wallPostData.error) {
            var a = Global_wallPostData.error.error_msg
              , b = "internal"
              , c = "";
            if (ErrorCode = Global_wallPostData.error.error_code,
            214 == ErrorCode) {
                var d = /a post is already scheduled for this time/gi
                  , e = /can only schedule/gi
                  , f = /cannot postpone post/gi;
                if (null  != d.exec(a))
                    a = "PlanPost";
                else if (null  != e.exec(a)) {
                    if (groupWidget.getPostsCount(1e3 * moment().startOf("day").unix()) < 50 || moment(Global_dataPost).unix() > moment().endOf("day").unix())
                        return AddPostToSite(),
                        void deletePhotosAfterPostVk();
                    a = "LimitPostVk"
                } else if (null  != f.exec(a))
                    return AddPostToSite(),
                    void deletePhotosAfterPostVk()
            } else
                219 == ErrorCode ? a = "commercialPost" : 17 == ErrorCode ? (a = 7,
                b = "global",
                c = Global_wallPostData.error.redirect_uri) : 14 == ErrorCode ? (Global_captcha_sid = "",
                Global_captcha_key = "",
                smmboxError.showError("captchaNeeded", "internal")) : a = "Код: vk_" + ErrorCode + ". Пожалуйста напишите разработчикам";
            smmboxError.showError(a, b, c),
            Global_buttonBlock = !1
        } else
            "fetch_vk_suggest" == Global_type && storage.set({
                suggest: !0
            }),
            SetSuccessPostLog();
    deletePhotosAfterPostVk()
}
function SendCaptchaVk() {
    Global_captcha_sid = void 0 != Global_photocopyData.error ? Global_photocopyData.error.captcha_sid : Global_wallPostData.error.captcha_sid,
    Global_captcha_key = $("#inputCaptcha").val(),
    $("#modalCaptcha").modal("hide"),
    SendPost()
}
function getPostInfoVk() {
    Global_postId = Global_postId.replace("smmbox_post", "");
    var a = "https://api.vk.com/method/wall.getById"
      , b = {};
    "site" == Global_source ? (b = "" != social_dataG.vk.token ? {
        posts: Global_postId,
        access_token: social_dataG.vk.token,
        extended: 1,
        copy_history_depth: 10,
        v: "5.7",
        https: 1
    } : {
        posts: Global_postId,
        extended: 1,
        copy_history_depth: 10,
        v: "5.7",
        https: 1
    },
    $.ajax({
        type: "GET",
        dataType: "jsonp",
        crossDomain: !0,
        url: a,
        data: b,
        success: function(a) {
            getPostInfoVkSuccess(a)
        }
    })) : (b = "" != social_dataG.vk.token_standalone ? {
        posts: Global_postId,
        access_token: social_dataG.vk.token_standalone,
        extended: 1,
        copy_history_depth: 10,
        v: "5.7",
        https: 1
    } : {
        posts: Global_postId,
        extended: 1,
        copy_history_depth: 10,
        v: "5.7",
        https: 1
    },
    $.ajax({
        type: "POST",
        dataType: "json",
        url: a,
        data: b,
        success: function(a) {
            getPostInfoVkSuccess(a)
        }
    }))
}
function getPostInfoVkSuccess(a) {
    if (console.log("SmmBox: get post info finish"),
    void 0 != a.error)
        throw $("#loader").show(),
        $("#main").hide(),
        1 == social_dataG.vk.isconnected ? smmboxError.showError(3, "global") : smmboxError.showError(32, "global"),
        0;
    if (1 == Array.isArray(a.response))
        getPostAttachVk(a);
    else if (a.response.items.length > 0) {
        if (a.response.items[0].copy_history && a.response.items[0].copy_history.length > 0) {
            var b = [];
            b.push(a.response.items[0].copy_history[a.response.items[0].copy_history.length - 1]),
            a.response.items = b
        }
        getPostAttachVk(a)
    } else
        smmboxError.showError("AccessDenied", "internal")
}
function getAttachOrWmrk() {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "https://smmbox.com/popup/webpost.php",
        data: {
            Global_arrayAttachments: Global_arrayAttachmentsVK,
            Global_idGroup: Global_idGroup.groupsPosting[0].id,
            Global_checkWmrk: Global_checkWmrk
        },
        success: function(a) {
            "yes" == a.error ? smmboxError.showError(a.errortext, "internal") : (Global_arrayAttachmentsVK = a.Global_arrayAttachments,
            NullOprosVk())
        }
    })
}
function setDatePostVk(a, b) {
    var c = moment().startOf("day").unix();
    moment().endOf("day").unix();
    "site" == Global_source ? $.ajax({
        type: "GET",
        dataType: "jsonp",
        crossDomain: !0,
        url: "https://api.vk.com/method/execute.getPostponedFromKit_and_countToday?daystart=" + c + "&gids=" + b + "&access_token=" + social_dataG.vk.token,
        data: {},
        success: function(b) {
            setDatePostVkSuccess(b, a)
        },
        error: function(a) {
            smmboxError.showError("Проблемы с получением отложенных записей из вк. Расписание может работать некорректно. Нужно обновить соединение.", "internal")
        }
    }) : $.ajax({
        type: "POST",
        dataType: "json",
        url: "https://api.vk.com/method/execute.getPostponedFromKit_and_countToday?daystart=" + c + "&gids=" + b + "&access_token=" + social_dataG.vk.token_standalone,
        data: {},
        success: function(b) {
            setDatePostVkSuccess(b, a)
        },
        error: function(a) {
            smmboxError.showError("Проблемы с получением отложенных записей из вк. Расписание может работать некорректно. Нужно обновить соединение.", "internal")
        }
    })
}
function setDatePostVkSuccess(a, b) {
    var c, d = 1e3 * moment().startOf("day").unix();
    if ("" != a)
        if (void 0 == a.error) {
            void 0 == Global_idGroup.collection.id && (Global_colDefPost += a.response[1].length - 1);
            for (var e, f = 0; f < a.response[1].length; f++)
                "object" == typeof a.response[1][f] ? (c = 1e3 * a.response[1][f].date - 36e5 * Global_TimeUTC,
                b.push(c),
                Global_PostVk[e]++,
                groupWidget.countPostsDay(c, 1)) : (e = a.response[1][f].toString(),
                Global_PostVk[e] = 0);
            a.response[0][0] > 0 && groupWidget.countPostsDay(d, a.response[0][0]),
            Global_MasDeffered = b
        } else
            smmboxError.showError("Проблемы с получением отложенных записей из вк. Расписание может работать некорректно. Нужно обновить соединение.", "internal");
    else
        smmboxError.showError("Проблемы с получением отложенных записей из вк. Расписание может работать некорректно. Нужно обновить соединение.", "internal");
    groupWidget.showPostponedInfo()
}
function deletePhotosAfterPostVk() {
    var a = [];
    if (Global_idGroup.groupsPosting[0].id < 0 && "site" != Global_source) {
        for (var b = 0; b < Global_imgAlbumDelete.length; b++) {
            var c = Global_imgAlbumDelete[b].replace("photo", "");
            c = c.split("_"),
            a.push(c[0]),
            a.push(c[1])
        }
        $.ajax({
            type: "POST",
            dataType: "json",
            cache: !1,
            url: "https://api.vk.com/method/execute.photodelete",
            data: {
                list: a,
                access_token: social_dataG.vk.token_standalone
            },
            success: function(a) {
                Global_imgAlbumDelete = []
            }
        })
    } else
        Global_imgAlbumDelete = []
}
function FillGroupSelectVK(a) {
    for ($("#smmbox_select").append('<optgroup label="В группу ВК" class="groupsVk"></optgroup>'),
    i = 0; i < a.length; i++)
        Global_Lastgroup == -1 * a[i].id ? $("#smmbox_select .groupsVk").prepend('<option value="-' + a[i].id + 'Tvk" data-image="' + a[i].photo_50 + '">' + a[i].name + "</option>") : $("#smmbox_select .groupsVk").append('<option value="-' + a[i].id + 'Tvk" data-image="' + a[i].photo_50 + '">' + a[i].name + "</option>");
    $("#smmbox_select").find("option:first-child").attr("selected", "selected")
}
function getPostInfoOk() {
    Global_postId = Global_postId.replace("smmbox_", "");
    var a = "mediatopic.getByIds"
      , b = "media_topic.*, share.*, photo.*, user_photo.*, group_photo.*, attachment_photo.*, happening_photo.*, music_track.*, video.*, poll.*, place.*"
      , c = {
        method: a,
        topic_ids: Global_postId,
        fields: b
    };
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "https://smmbox.com/api/ok.php",
        data: c,
        success: function(a) {
            if (console.log("SmmBox: get post info finish"),
            void 0 == a.error_code)
                a.media_topics.length > 0 && getPostAttachOk(a);
            else {
                if (103 == a.error_code)
                    return $("#loader").show(),
                    $("#main").hide(),
                    void smmboxError.showError(6, "global");
                alert("Невозможно получить информацию об этом посте. Попробуйте скопировать другой пост")
            }
        }
    })
}
function getPostAttachOk(a) {
    var b, c = [];
    if (void 0 != a.media_topics[0].media)
        for (var d = 0; d < a.media_topics[0].media.length; d++)
            switch (b = a.media_topics[0].media[d],
            b.type) {
            case "text":
                c.length > 0 || d > 0 ? c.push({
                    miniImg: b.url_image,
                    height: 20,
                    width: 40,
                    id: "",
                    type: b.type,
                    text: b.text,
                    accessKey: "",
                    origImg: "",
                    desktopImg: "0"
                }) : $("#smmbox_text").val(b.text);
                break;
            case "photo":
                for (var e, f = 0; f < b.photo_refs.length; f++) {
                    e = b.photo_refs[f];
                    var g = "";
                    if (void 0 != a.entities.group_photos ? g = "group_photos" : void 0 != a.entities.photos && (g = "photos"),
                    "" != g)
                        for (var h = 0; h < a.entities[g].length; h++)
                            if (a.entities[g][h].ref == e) {
                                var i, j = a.entities[g][h];
                                i = void 0 !== j.pic1024x768 ? j.pic1024x768 : void 0 !== j.pic1024max ? j.pic1024max : void 0 !== j.pic640x480 ? j.pic640x480 : void 0 !== j.pic320min ? j.pic320min : void 0 !== j.pic240min ? j.pic240min : void 0 !== j.pic180min ? j.pic180min : j.pic128x128,
                                c.push({
                                    miniImg: j.pic128x128,
                                    height: 20,
                                    width: 40,
                                    id: "photo_" + j.id,
                                    type: "photo",
                                    text: j.standard_width + "x" + j.standard_height,
                                    accessKey: "",
                                    origImg: i,
                                    desktopImg: "0"
                                })
                            }
                }
                break;
            case "music":
                for (var k, l = 0; l < b.music_track_refs.length; l++)
                    if (k = b.music_track_refs[l],
                    void 0 != a.entities.music_tracks)
                        for (var m = 0; m < a.entities.music_tracks.length; m++)
                            a.entities.music_tracks[m].ref == k && c.push({
                                miniImg: "",
                                height: 20,
                                width: 40,
                                id: a.entities.music_tracks[m].id,
                                type: "audio",
                                text: a.entities.music_tracks[m].title + "." + a.entities.music_tracks[m].artistName,
                                accessKey: "",
                                origImg: "",
                                desktopImg: "0",
                                duration: "",
                                url: ""
                            });
                break;
            case "movie":
                for (var n, o = 0; o < b.movie_refs.length; o++)
                    if (n = b.movie_refs[o],
                    void 0 != a.entities.videos)
                        for (var p = 0; p < a.entities.videos.length; p++)
                            a.entities.videos[p].ref == n && c.push({
                                miniImg: a.entities.videos[p].small_thumbnail_url,
                                height: 20,
                                width: 40,
                                id: "movie_" + a.entities.videos[p].id,
                                type: "video",
                                text: a.entities.videos[p].title,
                                accessKey: "",
                                origImg: "",
                                desktopImg: "0",
                                duration: Math.round(a.entities.videos[p].duration / 1e3)
                            });
                break;
            case "poll":
                for (var q, r = 0; r < b.poll_refs.length; r++)
                    if (q = b.poll_refs[r],
                    void 0 != a.entities.polls)
                        for (var s = 0; s < a.entities.polls.length; s++)
                            a.entities.polls[s].ref == q && c.push({
                                miniImg: "poll",
                                height: 20,
                                width: 40,
                                id: "",
                                type: b.type,
                                text: a.entities.polls[s].question,
                                accessKey: "",
                                origImg: "",
                                desktopImg: "0",
                                answers: a.entities.polls[s].answers,
                                options: a.entities.polls[s].options
                            });
                break;
            case "link":
                c.push({
                    miniImg: b.url_image,
                    height: 20,
                    width: 40,
                    id: b.url,
                    type: b.type,
                    text: "Ссылка",
                    accessKey: "",
                    origImg: "",
                    desktopImg: "0",
                    url: b.url
                })
            }
    if (void 0 != a.media_topics[0].place_ref) {
        var t = a.media_topics[0].place_ref;
        if (void 0 != a.entities.places)
            for (var s = 0; s < a.entities.places.length; s++)
                a.entities.places[s].ref == t && (Global_point = {
                    id: a.entities.places[s].id,
                    lat: a.entities.places[s].lat,
                    lng: a.entities.places[s].lng,
                    name: a.entities.places[s].name,
                    category: a.entities.places[s].category_id,
                    string: "&lat=" + a.entities.places[s].lat + "&long=" + a.entities.places[s].lng
                })
    }
    full_form(c)
}
function setPostOk() {
    0 == Global_idGroup.idGroup ? alert("Выберите группу") : 1 == Global_flagPost ? 1 == Global_editable ? SendEditPostOnSite() : AddPostToSite() : getAttachOrWmrkOk()
}
function countTextAttachOk() {
    for (var a = 0, b = 0; b < Global_arrayAttachmentsOK.length; b++)
        "text" == Global_arrayAttachmentsOK[b][3] && a++;
    return a
}
function getAttachOrWmrkOk() {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "https://smmbox.com/popup/webpost_ok.php",
        data: {
            Global_arrayAttachments: Global_arrayAttachmentsOK,
            Global_idGroup: Global_idGroup.groupsPosting[0].id,
            Global_checkWmrk: Global_checkWmrk
        },
        success: function(a) {
            "yes" == a.error ? smmboxError.showError(a.errortext, "internal") : (Global_arrayAttachmentsOK = a.Global_arrayAttachments,
            WallPostOk())
        }
    })
}
function WallPostOk() {
    if (0 == Global_flagPost) {
        var a = "mediatopic.post"
          , b = collectAttachOk()
          , c = Math.abs(Global_idGroup.groupsPosting[0].id)
          , d = "GROUP_THEME";
        if (c != social_dataG.ok.uid)
            var e = {
                method: a,
                attachment: b,
                type: d,
                gid: c
            };
        else
            var e = {
                method: a,
                attachment: b
            };
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "https://smmbox.com/api/ok.php",
            data: e,
            success: function(a) {
                return console.log("SmmBox: mediatopic post OK finish"),
                void 0 != a.error_code ? (smmboxError.showError(a.error_msg, "internal"),
                0) : void (0 == Global_flagPost && SetSuccessPostLog())
            }
        })
    }
}
function collectAttachOk() {
    var a = {}
      , b = "";
    if (a = '{"media": [',
    Global_arrayAttachmentsOK.length > 0)
        for (var c = 0; c < Global_arrayAttachmentsOK.length; c++) {
            switch (Global_arrayAttachmentsOK[c][3]) {
            case "text":
                b = '{"type": "text", "text": "' + Global_arrayAttachmentsOK[c][6] + '"}';
                break;
            case "photo":
                for (var d = c, e = "[", f = 1, g = "", h = c + 1; h < Global_arrayAttachmentsOK.length; h++)
                    Global_arrayAttachmentsOK[h] && ("photo" == Global_arrayAttachmentsOK[h][3] ? d = h : (d = h - 1,
                    h = Global_arrayAttachmentsOK.length));
                g = Math.abs(Global_idGroup.groupsPosting[0].id) != Global_idGroup.groupsPosting[0].id ? '"id"' : '"photoId"';
                for (var i = c; d >= i; i++)
                    e = e + "{ " + g + ': "' + Global_arrayAttachmentsOK[i][7] + '" }',
                    d - c >= f && (e += ","),
                    f++;
                e += "]",
                b = '{"type": "photo","list": ' + e + "}",
                c = d;
                break;
            case "video":
                var j = Global_arrayAttachmentsOK[c][0].split("movie_")[1];
                b = "ok" == Global_soc ? '{"type": "movie-reshare", "movieId": ' + j + "}" : "";
                break;
            case "link":
                b = '{"type": "link", "url": "' + Global_arrayAttachmentsOK[c][0] + '"}';
                break;
            case "audio":
                b = "ok" == Global_soc ? '{"type": "music","list": [{ "id": "' + Global_arrayAttachmentsOK[c][0] + '", "title": "' + Global_arrayAttachmentsOK[c][6].split(".")[0] + '", "artistName": "' + Global_arrayAttachmentsOK[c][6].split(".")[1] + '", "albumName": "' + Global_arrayAttachmentsOK[c][6].split(".")[2] + '"}]}' : "";
                break;
            case "poll":
                for (var k = "[", l = "", i = 0; i < Global_arrayAttachmentsOK[c][7].length; i++)
                    k = i > 0 ? k + ', {"text": "' + Global_arrayAttachmentsOK[c][7][i].text + '"}' : k + '{"text": "' + Global_arrayAttachmentsOK[c][7][i].text + '"}';
                if (k += "]",
                void 0 != Global_arrayAttachmentsOK[c][8])
                    for (var i = 0; i < Global_arrayAttachmentsOK[c][8].length; i++)
                        l = i > 0 ? l + ", " + Global_arrayAttachmentsOK[c][8][i] : Global_arrayAttachmentsOK[c][8][i];
                else
                    l = "";
                b = '{"type": "poll", "question": "' + Global_arrayAttachmentsOK[c][6] + '", "answers": ' + k + ', "options": "' + l + '"}'
            }
            "" != b && (a = '{"media": [' == a ? a + b : a + "," + b)
        }
    a += "]";
    Global_arrayAttachmentsOK.length - 1;
    return "" != Global_point ? (b = ', "place": {"lat": "' + Global_point.lat + '", "lng": "' + Global_point.lng + '", "place_name": "' + Global_point.name + '", "category": "' + Global_point.category + '"}',
    a = a + b + "}") : a += "}",
    a
}
function FillGroupSelectOK(a) {
    $("#smmbox_select").find(".groupsVk").length > 0 ? $("#smmbox_select").append('<optgroup label="В группу OK" class="groupsOk"></optgroup>') : $("#smmbox_select").html('<optgroup label="В группу OK" class="groupsOk"></optgroup>');
    var b = "";
    for (i = 0; i < a.length; i++)
        a[i].picAvatar || (a[i].picAvatar = "https://st.mycdn.me/res/i/ic/placeholders/group-create.png"),
        b = '<option value="-' + a[i].uid + 'Tok" data-image="' + a[i].picAvatar + '">' + a[i].name + "</option>",
        Global_Lastgroup == -1 * a[i].uid ? $("#smmbox_select .groupsOk").prepend(b) : $("#smmbox_select .groupsOk").append(b)
}
function addPostquestionOk() {
    var a = ""
      , b = []
      , c = []
      , d = [];
    a = $("#add_question").val(),
    $(".addpost_answers").each(function(a) {
        b.push('"' + $(this).val() + '"'),
        c.push({
            text: $(this).val()
        })
    }
    ),
    $("#isAnonimus").is(":checked") && d.push("AnonymousVoting"),
    $("#SingleChoice").is(":checked") && d.push("SingleChoice");
    var e = {
        miniImg: "poll",
        height: 20,
        width: 40,
        id: "",
        type: "poll",
        title: a,
        text: a,
        accessKey: "",
        origImg: "",
        desktopImg: "0",
        answers: c,
        options: d
    };
    attachmentWidget.addAttach(e)
}
function getEditPostInfoSite() {
    var a = !1;
    a || (a = !0,
    $.ajax({
        type: "POST",
        dataType: "json",
        cache: !1,
        url: "https://smmbox.com/autoposting/getpostinfo.php",
        data: {
            post: Global_postId
        },
        success: function(b) {
            console.log("SmmBox: get post info finish"),
            a = !1,
            Global_editable = !0,
            Global_editable_time = b.time,
            Global_editable_post_id = b.post_id,
            text = b.text,
            group_id = b.gid,
            soc_to = b.social_to,
            time = b.time,
            from = b.from,
            sign = b.sign,
            list = b.list,
            DatImgs = b.attachments,
            Global_point = b.point,
            Global_soc = b.social_from;
            var c, d;
            if ("vk" == soc_to ? c = [group_id] : "ok" == soc_to && (d = [group_id]),
            "text" == DatImgs[0].type) {
                var e = DatImgs.shift();
                $("#smmbox_text").val(e.text)
            }
            socManager.getGroupsInfo(c, d),
            full_form(DatImgs)
        }
    }))
}
var jscrollBlocks = {
    audioResult: $("#smmbox-body").find("#addpost_audio_result"),
    audioResultPane: void 0,
    videoResult: $("#smmbox-body").find("#addpost_video_result"),
    videoResultPane: void 0
}, observe;
observe = window.attachEvent ? function(a, b, c) {
    a.attachEvent("on" + b, c)
}
 : function(a, b, c) {
    a.addEventListener(b, c, !1)
}
;
var calendarWidget = function() {
    function a() {
        $("#datetimepicker3").datepicker().on("changeDate", function(a) {
            var c = b()
              , d = moment().startOf("day").unix()
              , e = moment().endOf("day").unix()
              , f = groupWidget.getPostsCount(c.newdate);
            if (Global_flagPost = !0,
            $(".block-date .select-wrap").show(),
            $(".block-date .custom-time").hide(),
            calendarWidget.setBtnSendText(c.newdate, c.hours, c.minutes),
            "" == smmboxError.getCurrentError() && smmboxPopup.clearMessage(),
            f >= 50 && "vk" == Global_idGroup.SocNetwork) {
                var g = "";
                g = moment(c.newdate).unix() >= d && moment(c.newdate).unix() <= e ? "На сегодня" : "На " + moment(c.newdate).format("D MMMM"),
                g += " вы исчерпали суточный лимит 50 постов. Скорее всего, ваш пост не будет опубликован.",
                smmboxPopup.showMessage(g, "error")
            }
        }
        ),
        $("#smmbox_select_hour, #smmbox_select_minute").on("change", function() {
            var a = b();
            Global_flagPost = !0,
            $(".block-date .select-wrap").show(),
            $(".block-date .custom-time").hide(),
            calendarWidget.setBtnSendText(a.newdate, a.hours, a.minutes)
        }
        ),
        $(".js-toggle-calendar").on("ifClicked", function() {
            var a = $(this);
            0 == a.prop("checked") ? (calendarWidget.openCalendar(),
            $("#smmbox_calendar_schedule").click(),
            Global_flagPost = !0) : (calendarWidget.closeCalendar(),
            Global_flagPost = !1)
        }
        ),
        $("#smmbox_calendar_schedule").click(function() {
            var a = $(this).data("date")
              , b = $(this).data("hours")
              , c = $(this).data("minutes");
            void 0 != a && void 0 != b && void 0 != c && (Global_flagPost = !0,
            calendarWidget.setCalendar(a, b, c))
        }
        )
    }
    function b() {
        var a = {
            newdate: $("#datetimepicker3").datepicker("getDate"),
            hours: $("#smmbox_select_hour").select2("val"),
            minutes: $("#smmbox_select_minute").select2("val")
        };
        return a
    }
    return {
        init: function() {
            $("#datetimepicker3").datepicker({
                weekStart: 1,
                todayHighlight: !0,
                language: "ru"
            }),
            $("#smmbox_select_hour, #smmbox_select_minute").select2({
                containerCssClass: "select-time",
                dropdownCssClass: "select-time-drop",
                width: 50,
                minimumResultsForSearch: -1
            }),
            $("#smmbox_select_hour, #smmbox_select_minute").on("select2-open", function() {
                $(".select2-results").addClass("scrollbar-macosx").scrollbar()
            }
            ),
            a()
        },
        getSelectHours: function() {
            return $("#smmbox_select_hour").select2("val")
        },
        getSelectMinutes: function() {
            return $("#smmbox_select_minute").select2("val")
        },
        getCalendar: function() {
            var a;
            return a = new Date($("#datetimepicker3").datepicker("getDate")),
            a.setHours(calendarWidget.getSelectHours()),
            a.setMinutes(calendarWidget.getSelectMinutes()),
            a
        },
        setCalendar: function(a, b, c) {
            c -= c % 5;
            var d = new Date(a.getFullYear(),a.getMonth(),a.getDate());
            $("#datetimepicker3").datepicker("setDate", d),
            $("#smmbox_select_hour").select2("val", b),
            $("#smmbox_select_minute").select2("val", c),
            calendarWidget.setBtnSendText(a, b, c),
            calendarWidget.openCalendar()
        },
        openCalendar: function() {
            $(".calendar-wrap").removeClass("hide"),
            $(".js-toggle-calendar").iCheck("check")
        },
        closeCalendar: function() {
            var a = new Date;
            Global_flagPost = !1,
            $("#datetimepicker3").datepicker("update", a),
            $("#datetimepicker3").find(".day.active").removeClass("active"),
            calendarWidget.setBtnSendText(),
            $(".calendar-wrap").addClass("hide"),
            $(".js-toggle-calendar").iCheck("uncheck")
        },
        setBtnSendText: function(a, b, c) {
            var d = "";
            void 0 != a ? (1 == c.toString().length && (c = "0" + c),
            d = "Опубликовать " + moment(a).format("D MMMM") + " в " + b + ":" + c) : d = "Опубликовать сейчас",
            $("#smmbox_button_posting").data("text", d).html(d)
        },
        calculatePointCalendar: function(a) {
            var b = new Date;
            if (a = a.sort(function(a, b) {
                return a - b
            }
            ),
            a.length <= 1)
                var c = new Date;
            else
                var d = a[a.length - 1]
                  , c = new Date(d);
            var e = !0;
            if (0 != Global_Calendar.length) {
                var f = new Date
                  , g = new Date
                  , h = 0;
                g.setHours(Global_Calendar[0][0], Global_Calendar[0][1], 0, 0);
                for (var i = !0; i; ) {
                    for (var j = !0, k = 0; k < a.length; k++) {
                        if (1 * a[k] == 1 * g.getTime() || 1 * g.getTime() < f.getTime()) {
                            h++,
                            h < Global_Calendar.length ? g.setHours(Global_Calendar[h][0], Global_Calendar[h][1], 0, 0) : (g.setDate(g.getDate() + 1),
                            g.setHours(Global_Calendar[0][0], Global_Calendar[0][1], 0, 0),
                            h = 0),
                            j = !1;
                            break
                        }
                        j = !0
                    }
                    1 == j && (b = g,
                    i = !1,
                    e = !1)
                }
            }
            if (e) {
                var l = c.getTime() + 72e5
                  , m = new Date(l);
                b = m
            }
            return $("#smmbox_calendar_schedule").data("date", b).data("hours", b.getHours()).data("minutes", b.getMinutes()),
            $("#smmbox_calendar_schedule .link").text(moment(b).format("D MMMM, HH:mm ")),
            b
        },
        setPointCalendar: function(a) {
            var b = calendarWidget.calculatePointCalendar(a);
            calendarWidget.setCalendar(b, b.getHours(), b.getMinutes())
        }
    }
}
(), audioWidget = function() {
    function a() {
        var a = $(smmboxPopup.block).find(".thumbnail_audio.active").find(".track-bar")
          , c = 0;
        "Infinity" == b.duration ? c = 100 : b.currentTime > 0 && (c = Math.floor(100 / b.duration * b.currentTime)),
        a.width(c + "%")
    }
    var b = document.getElementById("smmbox-audioplayer");
    return {
        init: function() {
            $(smmboxPopup.block).find(".overflow_img-audio .icon-wrap").click(function() {
                var a = $(this)
                  , b = a.closest(".thumbnail_audio ");
                1 == a.find(".fa").hasClass("fa-play") ? audioWidget.play(b) : audioWidget.stop(b)
            }
            )
        },
        play: function(c) {
            var d = c.data("url");
            $(b).attr("src", d),
            b.play(),
            $(smmboxPopup.block).find(".thumbnail_audio .fa-pause").removeClass("fa-pause").addClass("fa-play"),
            c.find(".fa-play").removeClass("fa-play").addClass("fa-pause"),
            b.addEventListener("timeupdate", a, !1),
            $(smmboxPopup.block).find(".thumbnail_audio").removeClass("active"),
            c.find(".track-bar").width(0),
            c.addClass("active"),
            c.find(".track").click(function(a) {
                var c = $(this).width()
                  , d = a.pageX - $(this).offset().left
                  , e = Math.floor(d / c * 100)
                  , f = Math.floor(e * b.duration / 100);
                b.currentTime = f
            }
            )
        },
        stop: function(a) {
            b.pause(),
            a.find(".fa-pause").removeClass("fa-pause").addClass("fa-play"),
            a.removeClass("active")
        }
    }
}
(), attachmentWidget = function() {
    return {
        prepareTemplate: function(a, b, c, d) {
            var e = "";
            switch (b.type) {
            case "photo":
                e = '<div class="overflow_img overflow_img-photo" title="' + a + '" data-soc-from="' + d + '"><div class="smmbox_vn thumbnail thumbnail_photo" data-masid="' + c + '" data-id="smmbox_load' + c + '"><span class="thumbnail__img" style="background-image: url(' + b.miniImg + ');"></span></div></div>';
                break;
            case "album":
                e = '<div class="overflow_img overflow_img-album" title="' + a + '" data-soc-from="' + d + '"><div class="smmbox_vn thumbnail thumbnail_photo" data-masid="' + c + '" data-id="smmbox_load' + c + '"><span class="thumbnail__img" style="background-image: url(' + b.miniImg + ');"></span><span class="thumbnail__duration">' + a + "</span></div></div>";
                break;
            case "video":
                var f = "mm:ss";
                b.duration >= 3600 && (f = "HH:mm:ss"),
                e = '<div class="overflow_img overflow_img-video" title="' + a + '" data-soc-from="' + d + '"><div class="smmbox_vn thumbnail thumbnail_photo" data-masid="' + c + '" data-id="smmbox_load' + c + '"><span class="thumbnail__img" style="background-image: url(' + b.miniImg + ');"></span><span class="thumbnail__duration"><span class="icon-movie"></span>' + moment.utc(1e3 * b.duration).format(f) + "</span></div></div>";
                break;
            case "doc":
                e = '<div class="overflow_img overflow_img-doc" title="' + a + '" data-soc-from="' + d + '"><a href="#" class="smmbox_vn thumbnail thumbnail_photo" data-masid="' + c + '" data-id="smmbox_load' + c + '"><span class="thumbnail__img" style="background-image: url(' + b.miniImg + ');"></span><span class="thumbnail__info">' + b.text + "<br>" + bytesToSize(parseInt(b.size)) + "</span></a></div>";
                break;
            case "audio":
                var f = "mm:ss"
                  , g = "";
                "" != b.duration && (b.duration >= 3600 && (f = "HH:mm:ss"),
                g = moment.utc(1e3 * b.duration).format(f)),
                e = '<div class="overflow_img overflow_img-audio" data-soc-from="' + d + '"><div class="smmbox_vn thumbnail thumbnail_audio" data-masid="' + c + '" data-id="smmbox_load' + c + '" data-url="' + b.url + '"><div class="col col-ico"><div class="icon-wrap"><i class="fa fa-play"></i></div></div><div class="col col-name"><div class="name-wrap"><span>' + b.text + '</span></div><div class="track"><div class="track-inner"><div class="track-bar"></div></div></div></div><div class="col col-duration"><div class="length-wrap">' + g + "</div></div></div></div>";
                break;
            case "page":
                e = '<div class="overflow_img overflow_img-page" data-soc-from="' + d + '"><div class="smmbox_vn thumbnail thumbnail_audio" data-masid="' + c + '" data-id="smmbox_load' + c + '"><div class="col col-ico"><div class="icon-wrap"><i class="fa fa-external-link"></i></div></div><div class="col col-description"><p class="name-wrap">' + a + "</p></div></div></div>";
                break;
            case "point":
                e = '<div class="overflow_img overflow_img-point" data-soc-from="' + d + '"><div class="smmbox_vn thumbnail thumbnail_audio" data-type="point" data-masid="' + c + '" data-id="smmbox_load' + c + '"><div class="col col-ico"><div class="icon-wrap"><i class="fa fa-map-marker"></i></div></div><div class="col col-description"><div class="name-wrap">' + a + "</div></div></div></div>";
                break;
            case "link":
                var h = "";
                "" != b.miniImg && (h = '<img src="' + b.miniImg + '"/>'),
                e = '<div class="overflow_img overflow_img-link" data-soc-from="' + d + '"><div class="smmbox_vn thumbnail thumbnail_link" data-masid="' + c + '" data-id="smmbox_load' + c + '"><div class="col col-ico"><div class="icon-wrap"><i class="fa fa-link"></i></div></div><div class="col col-description"><p class="name-wrap">' + h + "<span>" + b.url + "</span></p></div></div></div>";
                break;
            case "poll":
                for (var i = "", j = 0; j < b.answers.length; j++)
                    i = i + "<li><span>" + b.answers[j].text + "</span></li>";
                e = '<div class="overflow_img overflow_img-poll" data-soc-from="' + d + '"><div class="smmbox_vn thumbnail thumbnail_poll" data-masid="' + c + '" data-id="smmbox_load' + c + '"><div class="col col-ico"><div class="icon-wrap"><i class="fa fa-list-ul"></i></div></div><div class="col col-description"><p class="question"><b>' + a + '</b></p><ul class="answers">' + i + "</ul></div></div></div>";
                break;
            case "text":
                e = '<div class="overflow_img overflow_img-text" data-soc-from="' + d + '"><div class="smmbox_vn thumbnail thumbnail_text" data-masid="' + c + '" data-id="smmbox_load' + c + '"><div class="col col-ico"><div class="icon-wrap"><b>T</b></div></div><div class="col col-description"><textarea class="scrollbar-macosx" placeholder="Введите текст">' + b.text + "</textarea> </div></div></div>";
                break;
            default:
                e = '<div class="overflow_img" title="' + a + '" data-soc-from="' + d + '"><a href="#" class="smmbox_vn thumbnail thumbnail_photo" data-masid="' + c + '" data-id="smmbox_load' + c + '">' + svgLoaders.checkmark + '<span class="thumbnail__img" style="background-image: url(' + b.miniImg + ');"></span></a></div>'
            }
            return e
        },
        addAttach: function(a) {
            $("#no_attach_text").remove();
            var b = "";
            "link" == a.type && (b = a.title,
            a.title = a.original),
            "poll" == a.type && (b = a.title);
            var c = {};
            if (c.miniImg = a.preview,
            c.height = 20,
            c.width = 40,
            c.id = a.id,
            c.type = a.type,
            c.text = a.title,
            c.accessKey = "",
            c.size = a.size,
            c.origImg = a.original,
            c.desktopImg = a.BoollDesktop,
            void 0 != a.duration && (c.duration = a.duration),
            void 0 != a.answers && (c.answers = a.answers),
            void 0 != a.url && (c.url = a.url),
            void 0 != a.options && (c.options = a.options),
            "" != a.preview) {
                c.miniImg
            } else {
                "data/images/" + a.type + ".png"
            }
            var d = (c.text,
            $(".overflow_img").not(".loadImg").length);
            "" != Global_point && (d -= 1),
            Global_masImg.push(c);
            var e = attachmentWidget.prepareTemplate(b, c, d, Global_idGroup.SocNetwork);
            if ("photo" == a.type || "doc" == a.type)
                $(e).insertBefore($(".loadImg")[0]),
                attachmentWidget.addAttachLoader(0);
            else {
                var f = $("#smmbox_attachments").append(e);
                "text" == a.type && f.find(".scrollbar-macosx").scrollbar(),
                "audio" == a.type && audioWidget.init()
            }
            $("#smmbox_attachments .overflow_img-" + a.type).not(".loadImg").last().addClass("check"),
            attachmentWidget.checkDisabled()
        },
        addAttachLoader: function(a, b) {
            var c = '<div class="loadImg overflow_img"><div class="txt_title"><div class="thumbnail thumbnail_photo check"><img class="loader-img" src="data/images/oval.svg" width="32" height="32"></div></div></div>';
            1 == a ? ($("#no_attach_text").remove(),
            b && $("#smmbox_attachments .overflow_img-" + b).length > 0 ? $("#smmbox_attachments .overflow_img-" + b).last().after(c) : $("#smmbox_attachments").append(c)) : $(".loadImg")[0].remove()
        },
        checkDisabled: function() {
            $("#smmbox_attachments .overflow_img").removeClass("disabled").removeClass("enabled"),
            $("#smmbox_attachments .overflow_img").each(function() {
                var a = $(this);
                (1 == a.hasClass("overflow_img-video") || 1 == a.hasClass("overflow_img-audio") || 1 == a.hasClass("overflow_img-album") || 1 == a.hasClass("overflow_img-doc") || 1 == a.hasClass("overflow_img-doc") || 1 == a.hasClass("overflow_img-page")) && a.data("soc-from") != Global_idGroup.SocNetwork && 1 != Global_idGroup.collection["from" + a.data("soc-from")] && a.addClass("disabled")
            }
            ),
            $("#smmbox_attachments .overflow_img").not(".disabled").addClass("enabled");
            var a = document.getElementById("smmbox_attachments");
            $("#smmbox_attachments").find(".overflow_img.enabled").length > 0 ? new Sortable(a,{
                disabled: !1,
                animation: 150,
                draggable: ".overflow_img.enabled"
            }) : new Sortable(a,{
                disabled: !0
            })
        },
        createPoll: function() {
            var a = ""
              , b = []
              , c = []
              , d = [];
            a = $("#add_question").val(),
            $(".poll-answers__input").each(function(a) {
                b.push('"' + $(this).val() + '"'),
                c.push({
                    text: $(this).val()
                })
            }
            ),
            $("#isAnonimus").is(":checked") && d.push("AnonymousVoting"),
            $("#SingleChoice").is(":checked") && d.push("SingleChoice");
            var e = {
                miniImg: "poll",
                height: 20,
                width: 40,
                id: "",
                type: "poll",
                title: a,
                text: a,
                accessKey: "",
                origImg: "",
                desktopImg: "0",
                answers: c,
                options: d
            };
            attachmentWidget.addAttach(e)
        }
    }
}
(), groupWidget = function() {
    return {
        setSettings: function(a, b, c) {
            storage.getObject(["groupSettings"], function(d) {
                var e = d.groupSettings
                  , f = !0;
                if (e instanceof Array)
                    for (var g = 0; g < e.length; g++)
                        e[g].id == a && (e[g][b] = c,
                        f = !1);
                else
                    e = [];
                1 == f && (e.push({
                    id: a,
                    CheckWmrk: !1,
                    CheckAdmin: !0,
                    CheckSign: !1
                }),
                e[e.length - 1][b] = c),
                storage.setObject({
                    groupSettings: e
                })
            }
            )
        },
        showGroupSettings: function() {
            $("#CheckWmrk").iCheck("enable"),
            $("#CheckWmrk").iCheck("uncheck"),
            $(".CheckWmrkText a").attr("href", "https://smmbox.com/watermark/?id=" + Math.abs(Global_idGroup.idGroup) + "&social=" + Global_idGroup.SocNetwork),
            $(".block-date .link-settings").attr("href", "https://smmbox.com/calendar/?id=" + Math.abs(Global_idGroup.idGroup) + "&social=" + Global_idGroup.SocNetwork),
            $("#smmbox-body .list-params__item-groups").show(),
            storage.getObject(["groupSettings"], function(a) {
                var b = a.groupSettings
                  , c = !1
                  , d = !1
                  , e = !1;
                if (Global_idGroup.idGroup < 0 ? $("#smmbox-body .list-params__item-groups").show() : $("#smmbox-body .list-params__item-groups").hide(),
                b instanceof Array) {
                    for (var f = 0; f < b.length; f++)
                        b[f].id == Global_idGroup.idGroup && (c = !0,
                        1 == b[f].CheckWmrk ? (d = !0,
                        social_dataG.vk.watermarks.indexOf(Global_idGroup.idGroup) >= 0 || social_dataG.ok.watermarks.indexOf(Global_idGroup.idGroup) ? $("#CheckWmrk").iCheck("check") : $("#CheckWmrk").iCheck("uncheck")) : $("#CheckWmrk").iCheck("uncheck"),
                        1 == b[f].CheckAdmin ? ($("#CheckAdmin").iCheck("check"),
                        $("#CheckSign").show(),
                        $("#CheckSign").closest(".icheckbox_flat").show(),
                        $(".CheckSignText").show()) : ($("#CheckAdmin").iCheck("uncheck"),
                        $("#CheckSign").hide(),
                        $("#CheckSign").closest(".icheckbox_flat").hide(),
                        $(".CheckSignText").hide()),
                        1 == b[f].CheckSign ? $("#CheckSign").iCheck("check") : $("#CheckSign").iCheck("uncheck"));
                    if (social_dataG.vk.watermarks.indexOf(Global_idGroup.idGroup) < 0 && social_dataG.ok.watermarks.indexOf(Global_idGroup.idGroup) < 0 && ($("#CheckWmrk").iCheck("uncheck"),
                    $("#CheckWmrk").iCheck("disable")),
                    void 0 != Global_idGroup.collection.id)
                        for (var g, h = 0; h < Global_idGroup.collection.items.length; h++)
                            g = "group" == Global_idGroup.collection.items[h].type ? "-" + Global_idGroup.collection.items[h].id : Global_idGroup.collection.items[h].id,
                            "vk" == Global_idGroup.collection.items[h].social && social_dataG.vk.watermarks.indexOf(g) >= 0 && (e = !0,
                            $("#CheckWmrk").iCheck("enable"),
                            1 == d && $("#CheckWmrk").iCheck("check")),
                            "ok" == Global_idGroup.collection.items[h].social && social_dataG.ok.watermarks.indexOf(g) >= 0 && (e = !0,
                            $("#CheckWmrk").iCheck("enable"),
                            1 == d && $("#CheckWmrk").iCheck("check"))
                } else
                    b = [];
                0 == c && ($("#CheckWmrk").iCheck("uncheck"),
                $("#CheckAdmin").iCheck("check"),
                $("#CheckSign").show(),
                $("#CheckSign").closest(".icheckbox_flat").show(),
                $(".CheckSignText").show(),
                $("#CheckSign").iCheck("uncheck"),
                social_dataG.vk.watermarks.indexOf(Global_idGroup.idGroup) < 0 && social_dataG.ok.watermarks.indexOf(Global_idGroup.idGroup) < 0 && 0 == e && $("#CheckWmrk").iCheck("disable"),
                b.push({
                    id: Global_idGroup.idGroup,
                    CheckWmrk: !1,
                    CheckAdmin: !0,
                    CheckSign: !1
                }),
                storage.setObject({
                    groupSettings: b
                }))
            }
            )
        },
        prepareSelect: function(a) {
            function b(a) {
                var b = ""
                  , c = ""
                  , d = "";
                return a.id ? (a.id.indexOf("vk") >= 0 ? b = "select-icon-soc_vk" : a.id.indexOf("ok") >= 0 && (b = "select-icon-soc_ok"),
                c = $("option[value=" + a.id + "]").attr("data-image"),
                d = "" == c ? '<div class="select2_group_item"><i class="select-icon-soc ' + b + '"></i><span class="group-name">' + a.text + "</span></div>" : '<div class="select2_group_item"><img src="' + c + '"><i class="select-icon-soc ' + b + '"></i><span class="group-name">' + a.text + "</span></div>") : a.text
            }
            $("#smmbox_select").append('<optgroup label="Подключить группу"><option value="AddGroupT" data-image="data/images/group-plus.jpg">Подключить группу</option></optgroup>'),
            $("#smmbox_select").find("option").index() >= 0 && ($("#smmbox_select").select2({
                containerCssClass: "select-custom",
                dropdownCssClass: "select-custom-drop",
                formatResult: b,
                formatSelection: b,
                width: 270,
                escapeMarkup: function(a) {
                    return a
                }
            }),
            $("#smmbox_select").on("select2-open", function() {
                $("#select2-drop .select2-results").addClass("scrollbar-macosx").scrollbar()
            }
            ),
            "" != Global_Lastgroup && $('#smmbox_select option[value="' + Global_Lastgroup + '"]').length > 0 && $("#smmbox_select").select2("val", Global_Lastgroup)),
            $("#smmbox_select").select2("enable", a),
            $("#smmbox_select").find("option").index() < 0 ? ($("#smmbox_select").hide(),
            $("#smmbox_select").after('<a target="_blank" href="https://smmbox.com/dashboard/">Подключить группу</a>')) : groupWidget.changeGroup()
        },
        changeGroup: function() {
            var a = $("#smmbox_select").select2("val").split("T");
            if (Global_colDefPost = 0,
            Global_colPostsDay = [],
            Global_idGroup.idGroup = a[0],
            Global_idGroup.SocNetwork = a[1],
            Global_idGroup.collection = {},
            Global_idGroup.groupsPosting = [],
            Global_idGroup.idGroup > 0 ? Global_idGroup.groupType = "user" : Global_idGroup.groupType = "group",
            "" == Global_idGroup.SocNetwork && "AddGroup" != Global_idGroup.idGroup) {
                Global_idGroup.groupType = "collection";
                for (var b = 0; b < smmboxCollections.length; b++)
                    smmboxCollections[b].id == Math.abs(Global_idGroup.idGroup) && (Global_idGroup.collection = smmboxCollections[b]);
                for (var b = 0; b < Global_idGroup.collection.items.length; b++)
                    "vk" == Global_idGroup.collection.items[b].social ? Global_idGroup.collection.fromvk = !0 : "ok" == Global_idGroup.collection.items[b].social && (Global_idGroup.collection.fromok = !0)
            }
            if (smmboxError.clearError(),
            void 0 == Global_idGroup.collection.id ? smmboxPopup.changeStyle(Global_idGroup.SocNetwork) : 1 != Global_idGroup.collection.fromok ? smmboxPopup.changeStyle("vk") : 1 != Global_idGroup.collection.fromvk ? smmboxPopup.changeStyle("ok") : smmboxPopup.changeStyle(""),
            attachmentWidget.checkDisabled(),
            console.log(Global_idGroup.idGroup),
            "AddGroup" != Global_idGroup.idGroup) {
                if (1 == Global_editable && Global_editable_time > moment().unix()) {
                    var c = new Date(1e3 * Global_editable_time);
                    calendarWidget.setCalendar(c, c.getHours(), c.getMinutes()),
                    $("#link_postponed").click(),
                    $(".block-date").addClass("loaded"),
                    $("#smmbox_button_posting").prop("disabled", !1)
                } else {
                    var d = [0];
                    Global_MasDeffered = [0],
                    $("#s2id_smmbox_select").tooltip("destroy"),
                    $(".block-date").removeClass("loaded"),
                    $("#smmbox_button_posting").prop("disabled", !0),
                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: "https://smmbox.com/popup/getpostponed.php?owner_id=" + Math.abs(Global_idGroup.idGroup) + "&owner_type=" + Global_idGroup.groupType + "&social=" + Global_idGroup.SocNetwork,
                        data: {},
                        success: function(a) {
                            if ("no" == a.error) {
                                if (Global_colPostsDay = [],
                                void 0 != a.autoposting) {
                                    for (var b, c = 0; c < a.autoposting.length; c++)
                                        if (a.autoposting[c].date_list.length > 0)
                                            for (var e = 0; e < a.autoposting[c].date_list.length; e++)
                                                b = 1e3 * a.autoposting[c].date_list[e] - 36e5 * Global_TimeUTC,
                                                d.push(b),
                                                groupWidget.countPostsDay(b, 1);
                                    Global_MasDeffered = d
                                }
                                switch (void 0 != a.autoposting && void 0 == Global_idGroup.collection.id && (Global_colDefPost += 1 * a.autoposting[0].date_list.length),
                                Global_Calendar = void 0 != a.calendar ? a.calendar : [],
                                Global_idGroup.SocNetwork) {
                                case "vk":
                                    setDatePostVk(d, [Global_idGroup.idGroup]);
                                    break;
                                case "ok":
                                    groupWidget.showPostponedInfo();
                                    break;
                                case "":
                                    var f = [];
                                    if (1 == Global_idGroup.collection.fromvk)
                                        for (var e = 0; e < Global_idGroup.collection.items.length; e++)
                                            if ("vk" == Global_idGroup.collection.items[e].social) {
                                                var g = "group" == Global_idGroup.collection.items[e].type ? "-" + Global_idGroup.collection.items[e].id : Global_idGroup.collection.items[e].id;
                                                f.push(g)
                                            }
                                    f.length > 0 ? setDatePostVk(d, f) : groupWidget.showPostponedInfo()
                                }
                            } else
                                Global_Calendar = [],
                                Global_MasDeffered = [moment().unix()],
                                calendarWidget.closeCalendar(),
                                calendarWidget.calculatePointCalendar(d),
                                $(".block-date").addClass("loaded"),
                                $("#smmbox_button_posting").prop("disabled", !1)
                        }
                    })
                }
                groupWidget.showGroupSettings()
            } else
                window.open("https://smmbox.com/dashboard/")
        },
        countPostsDay: function(a, b) {
            if (void 0 == Global_idGroup.collection.id) {
                var c = moment(moment(a).format("YYYY-MM-DD")).startOf("day").unix()
                  , d = !1;
                if (Global_colPostsDay.length > 0)
                    for (var e = 0; e < Global_colPostsDay.length; e++)
                        Global_colPostsDay[e].date == c && (Global_colPostsDay[e].count = Global_colPostsDay[e].count + b,
                        d = !0);
                0 == d && Global_colPostsDay.push({
                    date: c,
                    count: b
                })
            }
        },
        getPostsCount: function(a) {
            var b = moment(moment(a).format("YYYY-MM-DD")).startOf("day").unix()
              , c = 0;
            if (Global_colPostsDay.length > 0)
                for (var d = 0; d < Global_colPostsDay.length; d++)
                    Global_colPostsDay[d].date == b && (c = Global_colPostsDay[d].count);
            return c
        },
        showPostponedInfo: function() {
            var a = ""
              , b = 1e3 * moment().startOf("day").unix()
              , c = groupWidget.getPostsCount(b);
            $("#s2id_smmbox_select").tooltip("destroy"),
            void 0 == Global_idGroup.collection.id && (0 != Global_colDefPost && (a = "<div>Отложенных&nbsp;постов&nbsp;в&nbsp;группе:&nbsp;" + Global_colDefPost + "</div>"),
            c > 0 && "vk" == Global_idGroup.SocNetwork && (a = a + "<div>Сегодня&nbsp;постов&nbsp;в&nbsp;группе:&nbsp;" + c + "</div>"),
            "" != a && $("#s2id_smmbox_select").tooltip({
                placement: "top",
                html: !0,
                title: a
            })),
            Global_Calendar && (0 != Global_Calendar.length ? calendarWidget.setPointCalendar(Global_MasDeffered) : (calendarWidget.closeCalendar(),
            calendarWidget.calculatePointCalendar(Global_MasDeffered))),
            $(".block-date").addClass("loaded"),
            $("#smmbox_button_posting").prop("disabled", !1)
        }
    }
}
(), smmboxError = function() {
    function a(a) {
        switch (a) {
        case "PostLimit":
            d = 'Тестовый период закончился. <br>Но вы можете купить безлимитный аккаунт и продолжить работу  <a href="https://smmbox.com/oplata.html" target="_blank"><button type="button" class="btn btn-primary btn-xs" style="margin-top: -14px;">купить<i class="fa fa-shopping-cart"></i></button></a>';
            break;
        case "LimitPostVk":
            d = "Вы исчерпали суточный лимит в 50 постов";
            break;
        case "PlanPost":
            d = "На это время уже запланирован пост";
            break;
        case "commercialPost":
            d = "На это время запланирован рекламный пост";
            break;
        case "captchaNeeded":
            d = "Требуется ввести текст с картинки";
            break;
        case "captchaNeededPhotocopy":
            d = "Требуется ввести текст с картинки";
            break;
        case "accessDenied":
            d = "У вас недостаточно прав для публикации в данную группу";
            break;
        case "authorizationЕrror":
            d = "Ошибка авторизации";
            break;
        case "AccessDenied":
            d = "Невозможно открыть пост, возможно группа закрыта или заблокирована";
            break;
        case "AccessPhotoDenied":
            d = "Невозможно добавить изображения, доступ запрещен. Попробуйте выбрать другие изображения.";
            break;
        case "ErrorUpload":
            d = "Проблема загрузки одного из изображений, попробуйте другое изображение";
            break;
        case "toManyLink":
            d = "К посту прикреплено больше одной ссылки. Выберите одну из них и попробуйте снова";
            break;
        case "toManyPolls":
            d = "К посту прикреплено больше одного опроса. Выберите один из них и попробуйте снова";
            break;
        case "toManyAttachments":
            d = "Одна запись не может содержать больше 10 вложений";
            break;
        case "emptyPost":
            d = "Вы пытаетесь разместить пустой пост";
            break;
        case "emptyText":
            d = "В посте обязательно должен быть текст";
            break;
        case "GroupLimit":
            d = 'Вы не можете поститить в эту группу.<br>На используемом тарифном плане вы можете постить только в <a href="https://smmbox.com/account.html" target="_blank" style="color: #FFF; text-decoration: underline;">эти группы</a>';
            break;
        case "suggest":
            d = "Для предложенных новостей можно использовать только отложенный постинг вк, сейчас там нет места";
            break;
        case "dateExpired":
            d = "Выбрана некорректная дата.";
            break;
        case "ErrorPhotoCopy":
            d = "Ошибка прикрепления изображений. Попробуйте выбрать другие изображения.";
            break;
        case "smmboxError.showErrorite":
            d = "Ошибка при соединении с сервером SmmBox.";
            break;
        case "ErrorCreatePoll":
            d = "Ошибка при создании опроса Вконтакте. Попробуйте еще раз.";
            break;
        case "ErrorPostVk":
            d = "Не удается разместить пост Вконтакте. Попробуйте еще раз через некоторое время.";
            break;
        case "notEnoughAnswers":
            d = "Недостаточное количество вариантов ответа в опросе.";
            break;
        case "answerTextLimit":
            d = "В вариантах ответа в опросе слишком большое количество символов.";
            break;
        default:
            d = a
        }
        return !1
    }
    function b(a, b) {
        switch (a) {
        case 1:
            d = 'Вы не авторизированы на сайте smmbox.com. Пожалуйста, войдите.<br><br><a href="https://smmbox.com/auth/" target="_blank"><button type="button" class="btn btn-success btn-lg">Войти</button></a>';
            break;
        case 2:
            d = "Smmbox не может обработать эту страницу, обновите страницу и повторите попытку, если это не поможет, обратитесь в службу технической поддержки.";
            break;
        case 3:
            d = 'Для работы расширения вам необходимо сначала подключить наше приложение ВКонтакте.<br><br><button type="button" class="btn btn-primary btn-lg">Подключить</button>';
            break;
        case 31:
            d = 'Потеря связи с приложением Вконтакте. Пожалуйста, подсоединитесь заново.<br><br><button type="button" class="btn btn-primary btn-lg">Подключить</button>';
            break;
        case 32:
            d = 'Для работы расширения вам необходимо сначала подключить ваш профиль ВКонтакте к SmmBox в личном кабинете.<br><br> <a href="https://smmbox.com/dashboard/" class="btn btn-primary btn-lg" target="_blank">Перейти в личный кабинет</a>';
            break;
        case 4:
            d = 'Потеря связи с приложением Вконтакте. Пожалуйста, подсоединитесь заново.<br><br><a href="https://smmbox.com/auth/reconnection.php?social=vk" target="_blank"><button type="button" class="btn btn-success btn-lg">Подсоединиться заново</button></a>';
            break;
        case 5:
            var c = "http://www.odnoklassniki.ru/oauth/authorize?client_id=1101075968&scope=VALUABLE_ACCESS;PUBLISH_TO_STREAM;GROUP_CONTENT;VIDEO_CONTENT;PHOTO_CONTENT;SET_STATUS;LONG_ACCESS_TOKEN&response_type=code&redirect_uri=https://smmbox.com/loginok.php&layout=w";
            d = 'Вы не авторизированы в приложении smmbox. Пожалуйста, войдите.<br><br><a href="' + c + '" target="_blank"><button type="button" class="btn btn-success btn-lg">Войти</button></a>';
            break;
        case 6:
            d = "" == social_dataG.ok.token ? 'Для работы SmmBox вам необходимо сначала подключить наше приложение в Одноклассниках.<br><br><button type="button" class="btn btn-primary btn-lg">Подключить</button>' : 'Возникла проблема с подключением вашего аккаунта к нашему приложению в Одноклассниках. Пожалуйста обновите соединение.<br><br><button type="button" class="btn btn-primary btn-lg">Обновить</button>',
            storage.set({
                href: "https://smmbox.com"
            });
            break;
        case 7:
            d = 'Потеря связи с аккаунтом Вконтакте. Необходимо обновить соединение.<br><br><a href="' + b + '" class="btn btn-primary btn-lg">Обновить соединение</a>'
        }
        return !1
    }
    var c = ""
      , d = "";
    return errorType = "",
    {
        getCurrentError: function() {
            return c
        },
        getCurrentErrorType: function() {
            return errorType
        },
        showError: function(e, f, g) {
            return c = e,
            errorType = f,
            "internal" == f ? (a(e),
            "captchaNeeded" == e ? (smmboxPopup.pushDown(!0),
            ShowCaptcha()) : "captchaNeededPhotocopy" == e && (smmboxPopup.pushDown(!0),
            ShowCaptchaPhotocopy()),
            d = '<i class="sprite sprite-attention-big"></i> ' + d,
            smmboxPopup.showMessage(d, "error")) : "global" == f && (b(e, g),
            $("#global_error p").html(d),
            1 == e ? $.ajax({
                type: "POST",
                dataType: "json",
                url: "https://smmbox.com/logout.php",
                data: {}
            }) : 3 == e || 31 == e ? $("#global_error p button").click(function() {
                refreshconnect_vk()
            }
            ) : 6 == e ? $("#global_error p button").click(function() {
                refreshconnect_ok()
            }
            ) : 7 == e && smmboxPopup.pushDown(!0),
            $("#loader").hide(),
            $("#main").hide(),
            $("#global_error").show()),
            !1
        },
        clearError: function() {
            c = "",
            d = "",
            $("#Footer_smmbox .footer-layer_error").removeClass("moveup")
        }
    }
}
(), Global_postId = 0, Global_postponed_limit, Global_PostVk = {}, Global_Calendar, Global_limit, Global_expireunlim, Global_MasDeffered = [0], Global_colDefPost = 0, Global_colDefPostToday = 0, Global_colPostsDay = [], Global_idGroup = {}, Global_Lastgroup = "", Global_buttonBlock = !1, Global_BoollLink = !1, Global_arrayAttachments = [], Global_arrayAttachmentsOrig = [], Global_arrayAttachmentsVK = [], Global_arrayAttachmentsOrigVK = [], Global_arrayAttachmentsOK = [], Global_arrayAttachmentsOrigOK = [], Global_version = "none", Global_dataPost, Global_publish_date = "", Global_flagPost = !1, Global_checkWmrk = !1, Global_fromGroup, Global_signed, Global_point = "", Global_wallPostData = "", Global_photocopyData = "", Global_imgAlbumDelete = [], Global_masImg, Global_source = "none", Global_type = "none", Global_MyVOrGrV = !0, Global_MyAOrGrV = !0, Global_uniqID = 0, Global_captcha_sid = "", Global_captcha_key = "", Global_TimeUTC = 0, Global_editable = !1, Global_editable_time, Global_editable_post_id, Global_idGroupFrom = "", Global_photos_count = 0, Global_soc = "vk", Global_through_site = !1, Global_vk_newpoll = !1, social_dataG = {
    vk: {
        isconnected: !1,
        uid: "",
        token_standalone: "",
        token: "",
        photo: "",
        groups: [],
        groups_shared: [],
        watermarks: []
    },
    ok: {
        isconnected: !1,
        uid: "",
        token: "",
        photo: "",
        groups: [],
        groups_shared: [],
        watermarks: []
    }
}, smmboxCollections = [], Global_success_posts = 0, Global_count_posts = 0;
$(document).ready(function() {
    eventsAdd(),
    storage.get(["Global_idGroup", "Global_source", "Global_type", "Uniqid", "Global_Lastgroup", "idGroupFrom", "token_standalone_vk"], function(a) {
        var b = a.Global_idGroup;
        Global_source = a.Global_source,
        Global_type = a.Global_type,
        Global_uniqID = a.Uniqid,
        Global_Lastgroup = a.Global_Lastgroup,
        Global_idGroupFrom = a.idGroupFrom,
        social_dataG.vk.token_standalone = a.token_standalone_vk,
        (null  == Global_Lastgroup || void 0 == Global_Lastgroup) && (Global_Lastgroup = ""),
        "empty_wall_vk" == Global_type && null  != Global_idGroupFrom && void 0 != Global_idGroupFrom && (Global_Lastgroup = Global_idGroupFrom + "Tvk"),
        "empty_wall_ok" == Global_type && null  != Global_idGroupFrom && void 0 != Global_idGroupFrom && (Global_Lastgroup = Global_idGroupFrom + "Tok"),
        $("#smmbox_text").focus(),
        getUserInfo(b)
    }
    ),
    "site" == Global_source ? VK.init({
        apiId: 4209815
    }) : (Global_version = chrome.app.getDetails().version,
    chrome.storage.onChanged.addListener(function(a, b) {
        void 0 != a.isClicked && 1 == a.isClicked.newValue && 1 == smmboxPopup.block.hasClass("up") && (smmboxPopup.clearTimeouts(),
        smmboxPopup.pushDown(),
        storage.set({
            isClicked: !1
        }))
    }
    ))
}
);
var smmboxPopup = function() {
    var a, b, c = $(".panel-main"), d = c.find("#Footer_smmbox");
    return {
        pushUp: function(a) {
            if (c.addClass("up"),
            void 0 != Global_idGroup.collection.id) {
                var b = Global_idGroup.collection.items.length - Global_idGroup.groupsPosting.length + 1;
                smmboxPopup.showMessage("Постим " + b + " из " + Global_idGroup.collection.items.length, "posting")
            } else
                smmboxPopup.showMessage("Постим", "posting");
            storage.get(["pushWindow"], function(a) {
                "site" == Global_source ? (parent.smmboxWindow.pushUpWin(500),
                $(parent.document.getElementById("smmbox_ext_iframe")).addClass("posting")) : storage.set({
                    pushWindow: ["up", Global_uniqID],
                    smmboxPosting: [!0, Global_uniqID],
                    isClicked: !1
                })
            }
            )
        },
        pushDown: function(a) {
            c.removeClass("up-more").removeClass("up"),
            "" == smmboxError.getCurrentError() && groupWidget.showPostponedInfo(),
            1 == a && ("site" == Global_source ? (parent.smmboxWindow.pushDownWin(500),
            $(parent.document.getElementById("smmbox_ext_iframe")).removeClass("posting")) : storage.set({
                pushWindow: ["down", Global_uniqID]
            }))
        },
        pushUpMore: function() {
            smmboxPopup.clearTimeouts(),
            "site" == Global_source ? (c.addClass("up-more"),
            parent.smmboxWindow.hideWin(400),
            b = setTimeout(function() {
                smmboxPopup.pushDown(),
                smmboxPopup.clearMessage()
            }
            , 500)) : (c.addClass("up-more"),
            storage.set({
                CloseWindow: !0,
                CloseID: Global_uniqID
            }),
            b = setTimeout(function() {
                smmboxPopup.pushDown(),
                smmboxPopup.clearMessage()
            }
            , 500))
        },
        showMessage: function(e, f) {
            Global_buttonBlock = !1,
            smmboxPopup.clearMessage(),
            "posting" == f ? (d.find(".footer-layer_posting").addClass("moveup"),
            d.find(".footer-layer_posting .text").html(e)) : "error" == f ? (d.find(".footer-layer_error").addClass("moveup"),
            d.find(".footer-layer_error .text").html(e),
            void 0 != Global_idGroup.collection.id && 1 == c.hasClass("up") ? d.find(".footer-layer_error .btn").show() : d.find(".footer-layer_error .btn").hide()) : "success" == f && (d.find(".footer-layer_success").addClass("moveup"),
            d.find(".footer-layer_success").html(e),
            smmboxPopup.clearTimeouts(),
            "site" == Global_source ? (a = setTimeout(function() {
                c.addClass("up-more"),
                parent.smmboxWindow.hideWin(400)
            }
            , 5e3),
            b = setTimeout(function() {
                smmboxPopup.pushDown(),
                smmboxPopup.clearMessage()
            }
            , 5500)) : (a = setTimeout(function() {
                c.addClass("up-more"),
                storage.set({
                    CloseWindow: !0,
                    CloseID: Global_uniqID
                })
            }
            , 5e3),
            b = setTimeout(function() {
                smmboxPopup.pushDown(),
                smmboxPopup.clearMessage()
            }
            , 5500))),
            "site" == Global_source ? $(parent.document.getElementById("smmbox_ext_iframe")).removeClass("posting") : storage.set({
                smmboxPosting: [!1, Global_uniqID]
            })
        },
        clearMessage: function() {
            d.find(".footer-layer").removeClass("moveup")
        },
        clearTimeouts: function() {
            void 0 != a && clearTimeout(a),
            void 0 != b && clearTimeout(b)
        },
        changeStyle: function(a) {
            $("#smmbox-body").attr("class", "smmbox-" + a)
        },
        hideLoader: function() {
            $("#loader").hide(),
            $("#main").show()
        },
        updatePopupAfterPost: function(a) {
            if (Global_idGroup.groupsPosting.splice(0, 1),
            Global_idGroup.groupsPosting.length > 0) {
                if (void 0 != Global_idGroup.collection.id) {
                    var b = Global_idGroup.collection.items.length - Global_idGroup.groupsPosting.length + 1;
                    smmboxPopup.showMessage("Постим " + b + " из " + Global_idGroup.collection.items.length, "posting")
                }
                switch (Global_arrayAttachmentsVK = Global_arrayAttachmentsOrigVK,
                Global_arrayAttachmentsOK = Global_arrayAttachmentsOrigOK,
                Global_idGroup.groupsPosting[0].soc) {
                case "vk":
                    setPostVk();
                    break;
                case "ok":
                    setPostOk()
                }
                return !1
            }
            Global_buttonBlock = !1,
            $("#smmbox_button_posting").html("Опубликовать сейчас"),
            0 == Global_expireunlim && $(".smmbox_limit").text(a.post_limit),
            "edit" == Global_type && storage.set({
                error_post_edit: Global_editable_post_id
            }),
            "no" == a.error ? (0 == Global_flagPost ? groupWidget.countPostsDay(1e3 * moment().startOf("day").unix(), 1) : (Global_colDefPost++,
            parseInt(Global_publish_date) < moment().endOf("day").unix() && groupWidget.countPostsDay(1e3 * moment().startOf("day").unix(), 1),
            Global_MasDeffered.push(1e3 * Global_publish_date - 36e5 * Global_TimeUTC)),
            void 0 != Global_idGroup.collection.id && (a.errortext = "PostCollection"),
            Global_idGroup.groupsPosting = [],
            InternalMessage(a.errortext)) : "yes" == a.error ? smmboxError.showError(a.errortext, "internal") : smmboxError.showError("Неизвестная ошибка, обратитесь к разработчикам.", "internal")
        },
        block: c
    }
}
()
  , socManager = function() {
    function a(a) {
        "" != a && (Global_arrayAttachments.push(["", "", "", "text", "", "", a]),
        Global_arrayAttachmentsOrig.push(["", "", "", "text", "", "", a]))
    }
    function b() {
        var a = 0
          , b = 0
          , c = 0
          , d = 0
          , e = !1;
        if ($(".overflow_img.check").not(".disabled").each(function(f) {
            var g = $(this).find(".smmbox_vn");
            if ("point" != g.data("type")) {
                "link" == Global_masImg[g.attr("data-masid")].type && (a++,
                Global_BoollLink = !0),
                "poll" == Global_masImg[g.attr("data-masid")].type && b++;
                var h = Global_masImg[g.attr("data-masid")];
                if ("text" == h.type ? (h.text = g.find("textarea").val(),
                c++) : d++,
                "video" == h.type)
                    Global_arrayAttachments.push([h.id, h.accessKey, h.origImg, h.type, h.desktopImg, h.miniImg, h.text, h.duration]),
                    Global_arrayAttachmentsOrig.push([h.id, h.accessKey, h.origImg, h.type, h.desktopImg, h.miniImg, h.text, h.duration]);
                else if ("audio" == h.type)
                    Global_arrayAttachments.push([h.id, h.accessKey, h.origImg, h.type, h.desktopImg, h.miniImg, h.text, h.duration, h.url]),
                    Global_arrayAttachmentsOrig.push([h.id, h.accessKey, h.origImg, h.type, h.desktopImg, h.miniImg, h.text, h.duration, h.url]);
                else if ("poll" == h.type) {
                    if (Global_arrayAttachments.push([h.id, h.accessKey, h.origImg, h.type, h.desktopImg, h.miniImg, h.text, h.answers, h.options]),
                    Global_arrayAttachmentsOrig.push([h.id, h.accessKey, h.origImg, h.type, h.desktopImg, h.miniImg, h.text, h.answers, h.options]),
                    c++,
                    "ok" == Global_idGroup.SocNetwork || 1 == Global_idGroup.collection.fromok) {
                        if (h.answers.length < 2)
                            throw smmboxError.showError("notEnoughAnswers", "internal"),
                            0;
                        for (var i = 0; i < h.answers.length; i++)
                            if (h.answers[i].text.length > 50)
                                throw smmboxError.showError("answerTextLimit", "internal"),
                                0
                    }
                } else
                    "doc" == h.type ? (Global_arrayAttachments.push([h.id, h.accessKey, h.origImg, h.type, h.desktopImg, h.miniImg, h.text, h.ext, h.size]),
                    Global_arrayAttachmentsOrig.push([h.id, h.accessKey, h.origImg, h.type, h.desktopImg, h.miniImg, h.text, h.ext, h.size]),
                    "gif" == h.ext && (Global_through_site = !0)) : "link" == h.type ? (Global_arrayAttachments.push([h.id, h.accessKey, h.origImg, h.type, h.desktopImg, h.miniImg, h.text, h.url]),
                    Global_arrayAttachmentsOrig.push([h.id, h.accessKey, h.origImg, h.type, h.desktopImg, h.miniImg, h.text, h.url])) : ("text" != h.type || "" != h.text) && (Global_arrayAttachments.push([h.id, h.accessKey, h.origImg, h.type, h.desktopImg, h.miniImg, h.text]),
                    Global_arrayAttachmentsOrig.push([h.id, h.accessKey, h.origImg, h.type, h.desktopImg, h.miniImg, h.text]),
                    "photo" == h.type && "" == h.id && (Global_through_site = !0))
            } else
                e = !0
        }
        ),
        0 == e && (Global_point = ""),
        Global_arrayAttachments.length < 1)
            throw smmboxError.showError("emptyPost", "internal"),
            0;
        if (1 == Global_arrayAttachments.length && "text" == Global_arrayAttachments[0][3] && "" == $.trim(Global_arrayAttachments[0][6]) && ("vk" == Global_idGroup.SocNetwork || 1 == Global_idGroup.collection.fromvk))
            throw smmboxError.showError("emptyPost", "internal"),
            0;
        if (a > 1)
            throw smmboxError.showError("toManyLink", "internal"),
            0;
        if ("vk" == Global_idGroup.SocNetwork || 1 == Global_idGroup.collection.fromvk) {
            if (b > 1)
                throw smmboxError.showError("toManyPolls", "internal"),
                0;
            if (d > 10)
                throw smmboxError.showError("toManyAttachments", "internal"),
                0;
            if (null  != Global_dataPost && void 0 != Global_dataPost && Global_MasDeffered.indexOf(1e3 * moment(Global_dataPost).unix()) > 0)
                throw smmboxError.showError("PlanPost", "internal"),
                0
        }
        if (("ok" == Global_idGroup.SocNetwork || 1 == Global_idGroup.collection.fromok) && "" == $("#smmbox_text").val() && 1 > c)
            throw smmboxError.showError("emptyText", "internal"),
            0
    }
    function c() {
        for (var a = JSON.parse(JSON.stringify(Global_arrayAttachments)), b = JSON.parse(JSON.stringify(Global_arrayAttachmentsOrig)), c = 0; c < a.length; c++)
            "text" == a[c][3] && 0 != c && ("text" == a[0][3] ? (a[0][6] = a[0][6] + "\n" + a[c][6],
            a.splice(c, 1),
            b[0][6] = b[0][6] + "\n" + b[c][6],
            b.splice(c, 1)) : (a.unshift(a[c]),
            a.splice(c + 1, 1),
            b.unshift(b[c]),
            b.splice(c + 1, 1))),
            "vk" == Global_soc ? (Global_arrayAttachmentsVK.push(a[c]),
            Global_arrayAttachmentsOrigVK.push(b[c])) : "ok" == Global_soc && "video" != a[c][3] && "audio" != a[c][3] && (Global_arrayAttachmentsVK.push(a[c]),
            Global_arrayAttachmentsOrigVK.push(b[c]))
    }
    function d() {
        for (var a = JSON.parse(JSON.stringify(Global_arrayAttachments)), b = JSON.parse(JSON.stringify(Global_arrayAttachmentsOrig)), c = 0; c < a.length; c++)
            "text" == a[c][3] && (a[c][6] = a[c][6].replace(/\n/g, "\\n").replace(/\"/g, '\\"'),
            b[c][6] = b[c][6].replace(/\n/g, "\\n").replace(/\"/g, '\\"')),
            "ok" == Global_soc ? (Global_arrayAttachmentsOK.push(a[c]),
            Global_arrayAttachmentsOrigOK.push(b[c])) : "vk" == Global_soc && "video" != a[c][3] && "audio" != a[c][3] && "album" != a[c][3] && "doc" != a[c][3] && "page" != a[c][3] && (Global_arrayAttachmentsOK.push(a[c]),
            Global_arrayAttachmentsOrigOK.push(b[c]))
    }
    return {
        getGroupsInfo: function(a, b) {
            var c = void 0 == a ? social_dataG.vk.groups : a
              , d = void 0 == b ? social_dataG.ok.groups : b
              , e = ""
              , f = ""
              , g = ""
              , h = !0;
            if ((void 0 != a || void 0 != b) && (h = !1),
            "fetch_vk_suggest" == Global_type && void 0 == a && (c = [Global_postId.split("-")[1].split("_")[0]],
            h = !1),
            c.length > 0 && void 0 == b) {
                var i = "https://api.vk.com/method/groups.get?extended=1&filter=editor&v=5.37&https=1&count=1000&access_token=";
                "site" == Global_source ? (i += social_dataG.vk.token,
                e = $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    crossDomain: !0,
                    url: i,
                    data: {}
                })) : e = $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: i + social_dataG.vk.token_standalone,
                    data: {}
                })
            }
            if (d.length > 0 && void 0 == a) {
                var j = "group.getInfo"
                  , k = "uid,name,pic_avatar"
                  , l = {
                    method: j,
                    uids: d.toString(),
                    fields: k
                };
                g = $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: "https://smmbox.com/api/ok.php",
                    data: l
                })
            }
            $.when(e, f, g).done(function(e, f, g) {
                if ($("#smmbox_select").html(""),
                console.log("SmmBox: get user groups info finish"),
                smmboxCollections.length > 0 && 0 == Global_editable && "fetch_vk_suggest" != Global_type) {
                    $("#smmbox_select").append('<optgroup label="В набор групп" class="groupsCollections"></optgroup>');
                    for (var i = 0; i < smmboxCollections.length; i++)
                        Global_Lastgroup == -1 * smmboxCollections[i].id ? $("#smmbox_select optgroup").prepend('<option value="-' + smmboxCollections[i].id + 'T" data-image="' + smmboxCollections[i].photo + '">' + smmboxCollections[i].name + "</option>") : $("#smmbox_select optgroup").append('<option value="-' + smmboxCollections[i].id + 'T" data-image="' + smmboxCollections[i].photo + '">' + smmboxCollections[i].name + "</option>")
                }
                if (c.length > 0 && void 0 == b)
                    if ("success" === e[1])
                        if (void 0 == e[0].error) {
                            for (var j = [], k = 0; k < e[0].response.items.length; k++)
                                for (var i = 0; i < c.length; i++)
                                    c[i] == e[0].response.items[k].id && j.push(e[0].response.items[k]);
                            FillGroupSelectVK(j)
                        } else
                            smmboxError.showError(31, "global");
                    else
                        console.log(e),
                        console.log("responseVk get groups info error"),
                        smmboxError.showError(31, "global");
                d.length > 0 && void 0 == a && "fetch_vk_suggest" != Global_type && ("success" === g[1] ? void 0 == g[0].error_msg ? FillGroupSelectOK(g[0]) : smmboxError.showError(6, "global") : (console.log(g),
                console.log("responseOk get groups info error"),
                smmboxError.showError(6, "global"))),
                "" != social_dataG.vk.uid && ("fetch_vk_suggest" != Global_type ? 0 != Global_expireunlim && "edit" != Global_type ? $("#smmbox_select").prepend('<optgroup label="На личную страницу" class="groupsWallPersonal"><option value="' + social_dataG.vk.uid + 'Tvk" data-image="' + social_dataG.vk.photo + '">Вконтакте</option></optgroup> ') : 0 != Global_expireunlim && "edit" == Global_type && c[0] == social_dataG.vk.uid && $("#smmbox_select").prepend('<optgroup label="На личную страницу" class="groupsWallPersonal"><option value="' + social_dataG.vk.uid + 'Tvk" data-image="' + social_dataG.vk.photo + '">Вконтакте</option></optgroup> ') : $("#CheckSign").iCheck("check")),
                "" != social_dataG.ok.uid && (0 != Global_expireunlim && "edit" != Global_type && "fetch_vk_suggest" != Global_type ? $("#smmbox_select").find(".groupsWallPersonal").length > 0 ? $("#smmbox_select .groupsWallPersonal").append('<option value="' + social_dataG.ok.uid + 'Tok" data-image="' + social_dataG.ok.photo + '">Одноклассники</option>') : $("#smmbox_select").prepend('<optgroup label="На личную страницу" class="groupsWallPersonal"><option value="' + social_dataG.ok.uid + 'Tok" data-image="' + social_dataG.ok.photo + '">Одноклассники</option></optgroup> ') : 0 != Global_expireunlim && "edit" == Global_type && d[0] == social_dataG.ok.uid && "fetch_vk_suggest" != Global_type && $("#smmbox_select").prepend('<optgroup label="На личную страницу" class="groupsWallPersonal"><option value="' + social_dataG.ok.uid + 'Tok" data-image="' + social_dataG.ok.photo + '">Одноклассники</option></optgroup> ')),
                "" == smmboxError.getCurrentError() && (groupWidget.prepareSelect(h),
                smmboxPopup.hideLoader())
            }
            )
        },
        getPostInfo: function() {
            switch (Global_photos_count = 0,
            Global_type) {
            case "edit":
                getEditPostInfoSite();
                break;
            case "find":
            case "fetch_vk_suggest":
            case "fetch_vk":
                Global_soc = "vk",
                getPostInfoVk();
                break;
            case "fetch_ok":
                Global_soc = "ok",
                getPostInfoOk();
                break;
            case "empty":
            case "empty_wall_vk":
            case "empty_wall_ok":
                full_form([]);
                break;
            default:
                storage.get(["DatImgs"], function(a) {
                    var b = a.DatImgs;
                    a.Text;
                    if (("" == b || null  == b || void 0 == b) && (b = []),
                    b.length > 0 && "text" == b[0].type) {
                        var c = b.shift();
                        $("#smmbox_text").val(c.text)
                    }
                    full_form(b)
                }
                )
            }
        },
        setPost: function() {
            if (Global_BoollLink = !1,
            Global_publish_date = "",
            1 == Global_flagPost ? (Global_dataPost = calendarWidget.getCalendar(),
            moment(Global_dataPost).unix() - moment().unix() < 0 && smmboxError.showError("dateExpired", "internal"),
            Global_publish_date = GetTimePostponed()) : Global_dataPost = null ,
            Global_arrayAttachments = [],
            Global_arrayAttachmentsOrig = [],
            Global_arrayAttachmentsVK = [],
            Global_arrayAttachmentsOrigVK = [],
            Global_arrayAttachmentsOK = [],
            Global_arrayAttachmentsOrigOK = [],
            a($("#smmbox_text").val()),
            b(),
            ("vk" == Global_idGroup.SocNetwork || 1 == Global_idGroup.collection.fromvk) && c(),
            ("ok" == Global_idGroup.SocNetwork || 1 == Global_idGroup.collection.fromok) && d(),
            void 0 == Global_idGroup.collection.items)
                Global_idGroup.groupsPosting.push({
                    id: Global_idGroup.idGroup,
                    type: Global_idGroup.groupType,
                    soc: Global_idGroup.SocNetwork
                });
            else if (0 == Global_idGroup.groupsPosting.length) {
                for (var e = 0; e < Global_idGroup.collection.items.length; e++)
                    "group" == Global_idGroup.collection.items[e].type ? Global_idGroup.groupsPosting.push({
                        id: "-" + Global_idGroup.collection.items[e].id,
                        soc: Global_idGroup.collection.items[e].social,
                        type: Global_idGroup.collection.items[e].type
                    }) : Global_idGroup.groupsPosting.push({
                        id: Global_idGroup.collection.items[e].id,
                        soc: Global_idGroup.collection.items[e].social,
                        type: Global_idGroup.collection.items[e].type
                    });
                Global_count_posts = Global_idGroup.groupsPosting.length,
                Global_success_posts = Global_idGroup.groupsPosting.length
            }
            if ("" == smmboxError.getCurrentError() && Global_idGroup.groupsPosting.length > 0)
                switch (Global_checkWmrk = $("#CheckWmrk").is(":checked") ? !0 : !1,
                smmboxPopup.pushUp(),
                Global_idGroup.groupsPosting[0].soc) {
                case "vk":
                    setPostVk();
                    break;
                case "ok":
                    setPostOk()
                }
        }
    }
}
();
