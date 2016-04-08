$(document).ready(function() {

    $('.comment-tree >> .athing').each(function() {

        var thing = $(this);

        var spn = $('<span></span>');
        var btn = $('<a>[-]</a>');
        spn.append(btn);

        var hide = function() {
            thing.find('.comment').hide();
            btn.text('[+]');

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
                thing.find('.comment').show();

                for (var i = 0; i < children.length; ++i) {
                    children[i].show();
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
