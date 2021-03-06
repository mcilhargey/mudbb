(function(a) {
    var b = function(b) {
        a(b).find(".cssConsoleDisplay span").removeClass("selected");
        clearInterval(b.cursor);
        if (b.cursor_position != a(b).find(".cssConsoleDisplay span").length) {
            a(b).find(".cssConsoleCursor").css({
                visibility: "hidden"
            });
            a(b).find(".cssConsoleDisplay span").eq(b.cursor_position).addClass("selected");
            b.cursor = window.setInterval(function() {
                if (a(b).find(".cssConsoleDisplay span").eq(b.cursor_position).hasClass("selected")) {
                    a(b).find(".cssConsoleDisplay span").eq(b.cursor_position).removeClass("selected")
                } else {
                    a(b).find(".cssConsoleDisplay span").eq(b.cursor_position).addClass("selected")
                }
            }, 500)
        } else {
            a(b).find(".cssConsoleCursor").css({
                visibility: "visible"
            });
            b.cursor = window.setInterval(function() {
                if (a(b).find(".cssConsoleCursor").css("visibility") === "visible") {
                    a(b).find(".cssConsoleCursor").css({
                        visibility: "hidden"
                    })
                } else {
                    a(b).find(".cssConsoleCursor").css({
                        visibility: "visible"
                    })
                }
            }, 500)
        }
        return b
    };
    var c = {
        init: function(c) {
            var d = a.extend({
                type: "text",
                inputId: null,
                inputName: null,
                inputValue: null,
                charLimit: 0,
                preventEnter: true,
                onEnter: function() {}
            }, c);
            return this.each(function() {
                var c = this;
                var e = a(this);
                c.cursor;
                c.cursor_position = 0;
                c.inputVal = "";
                e.addClass("cssConsole");
                e.append('<span class="cssConsoleDisplay"></span>');
                e.append('<div class="cssConsoleCursor"></div>');
                e.append('<input id="autocomp" class="cssConsoleInput" type="' + d.type + '" />');
                if (d.inputId) {
                    e.find(".cssConsoleInput").attr("id", d.inputId)
                }
                if (d.inputName) {
                    e.find(".cssConsoleInput").attr("name", d.inputName)
                }
                if (d.inputValue) {
                    if (d.charLimit > 0 && d.charLimit < d.inputValue.length) {
                        d.inputValue = d.inputValue.substring(0, d.charLimit)
                    }
                    c.cursor_position = d.inputValue.length;
                    for (var f = 0; f < d.inputValue.length; f++) {
                        e.find(".cssConsoleDisplay").append("<span>" + d.inputValue.charAt(f) + "</span>")
                    }
                    e.find(".cssConsoleInput").val(d.inputValue);
                    c.inputVal = d.inputValue
                }
                e.on("click", function() {
                    e.find(".cssConsoleInput").focus();
                    b(c)
                });
                e.find(".cssConsoleInput").on("focus", function() {
                    b(c)
                });
                e.find(".cssConsoleInput").on("blur", function() {
                    clearInterval(c.cursor);
                    if (c.cursor_position != e.find(".cssConsoleDisplay span").length) {
                        e.find(".cssConsoleDisplay span").removeClass("selected")
                    } else {
                        e.find(".cssConsoleCursor").css({
                            visibility: "hidden"
                        })
                    }
                });
                e.find(".cssConsoleInput").on("keydown", function(a) {
                    if (a.which == 8) {
                        if (c.cursor_position > 0) {
                            e.find(".cssConsoleDisplay span").eq(c.cursor_position - 1).remove();
                            c.inputVal = c.inputVal.slice(0, c.cursor_position - 1) + c.inputVal.slice(c.cursor_position, c.inputVal.length);
                            c.cursor_position--
                        }
                    } else if (a.which == 13) {
                        if (d.preventEnter) {
                            a.preventDefault()
                        }
                        d.onEnter()
                    } else if (a.which == 46) {
                        if (c.cursor_position < e.find(".cssConsoleDisplay span").length) {
                            e.find(".cssConsoleDisplay span").eq(c.cursor_position).remove()
                        }
                        c.inputVal = c.inputVal.slice(0, c.cursor_position) + c.inputVal.slice(c.cursor_position + 1, c.inputVal.length)
                    } else if (a.which == 35) {
                        c.cursor_position = e.find(".cssConsoleDisplay span").length
                    } else if (a.which == 36) {
                        c.cursor_position = 0
                    } else if (a.which == 37) {
                        if (c.cursor_position > 0) {
                            c.cursor_position--
                        }
                    } else if (a.which == 39) {
                        if (c.cursor_position < e.find(".cssConsoleDisplay span").length) {
                            c.cursor_position++
                        }
                    } else {}
                    if (e.find(".cssConsoleInput").is(":focus")) {
                        b(c)
                    }
                });
                e.find(".cssConsoleInput").on("keyup", function(a) {
                    if (a.which != 8 && a.which != 46) {
                        if (c.inputVal != e.find(".cssConsoleInput").val()) {
                            e.find(".cssConsoleDisplay").empty();
                            if (c.inputVal.length == e.find(".cssConsoleInput").val().length) {
                                for (var f = 0; f < e.find(".cssConsoleInput").val().length; f++) {
                                    if (d.type == "password") {
                                        e.find(".cssConsoleDisplay").append("<span>*</span>")
                                    } else {
                                        e.find(".cssConsoleDisplay").append("<span>" + e.find(".cssConsoleInput").val().charAt(f) + "</span>")
                                    }
                                }
                            } else {
                                if (d.charLimit > 0 && d.charLimit < e.find(".cssConsoleInput").val().length) {
                                    e.find(".cssConsoleInput").val(e.find(".cssConsoleInput").val().substring(0, d.charLimit))
                                }
                                for (var f = 0; f < e.find(".cssConsoleInput").val().length; f++) {
                                    if (d.type == "password") {
                                        e.find(".cssConsoleDisplay").append("<span>*</span>")
                                    } else {
                                        e.find(".cssConsoleDisplay").append("<span>" + e.find(".cssConsoleInput").val().charAt(f) + "</span>")
                                    }
                                }
                                c.cursor_position = c.cursor_position + e.find(".cssConsoleInput").val().length - c.inputVal.length
                            }
                            c.inputVal = e.find(".cssConsoleInput").val();
                            b(c)
                        }
                    }
                });
                return this
            })
        },
        destroy: function() {
            return this.each(function() {
                var b = this;
                var c = a(this);
                b.cursor_position = 0;
                clearInterval(b.cursor);
                c.find(".cssConsoleInput").val("");
                c.empty();
                c.removeClass("cssConsole");
                return this
            })
        },
        reset: function() {
            return this.each(function() {
                var c = this;
                var d = a(this);
                c.cursor_position = 0;
                if (c.cursor_position != d.find(".cssConsoleDisplay span").length) {
                    d.find(".cssConsoleDisplay span").removeClass("selected")
                }
                d.find(".cssConsoleInput").val("");
                if (d.find(".cssConsoleInput").is(":focus")) {
                    b(d)
                } else {
                    clearInterval(c.cursor);
                    d.find(".cssConsoleCursor").css({
                        visibility: "hidden"
                    })
                }
                d.find(".cssConsoleDisplay").empty();
                return this
            })
        }
    };
    a.fn.cssConsole = function(b) {
        if (c[b]) {
            return c[b].apply(this, Array.prototype.slice.call(arguments, 1))
        } else if (typeof b === "object" || !b) {
            return c.init.apply(this, arguments)
        } else {
            a.error("Method " + b + " does not exist on jQuery.cssConsole")
        }
    }
})(jQuery)