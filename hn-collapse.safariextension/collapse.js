$(document).ready(function() {

    $('.comment-tree >> .athing').each(function() {

        var thing = $(this);

        var spn = $('<span></span>');
        var btn = $('<a class="hn-collapse-open">[-]</a>');
        spn.append(btn);

        var hide = function() {
            thing.find('.comment').hide();
            btn.text('[+]');

            btn.addClass('hn-collapse-closed').removeClass('hn-collapse-open');

            var myIndent = thing.find("img[src='s.gif']").width();

            var children = [];
            var curr = thing.next();
            while (true) {
                var currIndent = curr.find("img[src='s.gif']").width();
                console.log(currIndent);
                if (currIndent > myIndent) {
                    children.push(curr);
                } else {
                    break;
                }
                curr = curr.next();
            }

            for (var i = 0; i < children.length; ++i) {
                children[i].hide();
            }

            btn.unbind().click(function() {
                btn.addClass('hn-collapse-open').removeClass('hn-collapse-closed');
                thing.find('.comment').show();

                for (var i = 0; i < children.length; ++i) {
                    children[i].show();
                    children[i].find('.hn-collapse-closed').click();
                }

                btn.text('[-]');
                btn.unbind().click(hide);
            });
        };

        btn.click(hide);

        $(this).find('.comhead').each(function() {
            $(this).append(spn);
        });

    });

});
