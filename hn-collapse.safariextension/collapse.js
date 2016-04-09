$(document).ready(function() {

    //iterate over each comment
    $('.comment-tree >> .athing').each(function() {

        var thing = $(this);

        //add a 'collapse' button to the comment header
        var spn = $('<span></span>');
        var btn = $('<a class="hn-collapse-open">[-]</a>');
        spn.append(btn);

        //function to collapse the comment and its children
        var hide = function() {
            //hide the comment text
            thing.find('.comment').hide();
            
            //replace the button text with an 'expand' symbol
            btn.text('[+]');

            //replace the class to identify that the comment is closed
            btn.addClass('hn-collapse-closed').removeClass('hn-collapse-open');

            //in hacker news, the indenting of child comments is done by adding an transparent image with a certain width
            // so need to find width of this comment, and then the child comments are those which have a greater indent
            var myIndent = thing.find("img[src='s.gif']").width();

            var children = [];
            
            //initialise to next comment
            var curr = thing.next();
            while (true) {
                //find indent of comment
                var currIndent = curr.find("img[src='s.gif']").width();

                if (currIndent > myIndent) {
                    //indent is greater - it is a child comment so add it to the list
                    children.push(curr);
                } else {
                    //indent is less than or equal to - ran out of child comments, break out of loop
                    break;
                }
                
                curr = curr.next();
            }

            //hide all child comments
            for (var i = 0; i < children.length; ++i) {
                children[i].hide();
            }

            //replace the click event of the button, now when clicked it will re-expand the comment
            btn.unbind().click(function() {
                
                //replace the class to indicate that the comment is open
                btn.addClass('hn-collapse-open').removeClass('hn-collapse-closed');
                
                //show the comment text
                thing.find('.comment').show();

                //show the children, and if they are also hidden, un-hide
                for (var i = 0; i < children.length; ++i) {
                    children[i].show();
                    children[i].find('.hn-collapse-closed').click();
                }

                //change the comment text
                btn.text('[-]');
                
                //re-bind this function to the click event
                btn.unbind().click(hide);
            });
        };

        btn.click(hide);

        //add the button
        $(this).find('.comhead').each(function() {
            $(this).append(spn);
        });

    });

});
