function drawTab($canvas, $div, selected, desactivated, lineWidth) {
    var padding = 10;
    var paddingTop = 5;
    var radius = 5;

    var left = $div.position().left - padding - radius;
    var top = $div.position().top - paddingTop;
    var width = $div.width() + (padding * 2) + (radius * 2);
    var height = $div.height() + paddingTop + lineWidth;

    $canvas.css('left', left);
    $canvas.css('top', top);
    $canvas.get(0).height = height;
    $canvas.get(0).width = width;

    var ctx = $canvas.get(0).getContext("2d");
    ctx.beginPath();

    ctx.moveTo(0, height);
    ctx.arcTo(radius, height, radius, height - radius, radius);
    ctx.arcTo(radius, lineWidth, radius * 2, lineWidth, radius);
    ctx.arcTo(width - radius, lineWidth, width - radius, lineWidth + radius, radius);
    ctx.arcTo(width - radius, height, width + radius, height, radius);

    ctx.fillStyle = '#a31180';
    $div.css("color", "#ffffff");

    if (selected) {
        ctx.fillStyle = '#ffffff';
        $div.css("color", "#a31180")
    }

    if (desactivated) {
        ctx.fillStyle = '#eeeeee';
        $div.css("color", "#ebebeb")
    }

    ctx.lineWidth = lineWidth;
    ctx.fill();
    ctx.stroke();
}

function createCanvasTabsBar(spaceBetweenTabs, lineWidth) {
    //Inits line width before drawing.
    $(".tabs").css("border-bottom", "solid " + lineWidth + "px");

    //Draws and actives tabs.
    $(".tabs > .tab").each(function () {
        var selected = $(this).hasClass("selected");
        var desactivated = $(this).hasClass("desactivated");

        $(this).before("<div></div>").prev().css("width", spaceBetweenTabs).css("display", "inline-block");
        drawTab($(this).children(".tab-canvas"), $(this).children(".tab-title"), selected, desactivated, lineWidth);

        $(this).click(function () {
            selected = $(this).hasClass("selected");
            desactivated = $(this).hasClass("desactivated");

            if (!desactivated && !selected) {
                $(".tab-canvas").each(function () {
                    if (!$(this).parent().hasClass("desactivated")) {
                        var canvas = $(this).get(0).getContext("2d");
                        canvas.fillStyle = "#a31180";
                        canvas.fill();
                        canvas.stroke();
                        $(this).siblings(".tab-title").css("color", "#ffffff");
                    }
                });
                var canvas = $(this).children(".tab-canvas").get(0).getContext("2d");
                canvas.fillStyle = "#ffffff";
                canvas.fill();
                canvas.stroke();
                $(this).children(".tab-title").css("color", "#a31180");
                $(this).addClass("selected");
                $(this).siblings(".tab").removeClass("selected");
            }
        });
    });
}
