$(document).ready(function () {
    var page = 1;

    $('#exampleModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var articleId = button.attr('data-articleId')
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this)
        // modal.find('.modal-title').text('New message to ' + recipient)
        // modal.find('.modal-body input').val(articleId)

    });

    function Querystring() {
        var q = window.location.search.substr(1),
            qs = {};
        if (q.length) {
            var keys = q.split("&"),
                k, kv, key, val, v;
            for (k = keys.length; k--;) {
                kv = keys[k].split("=");
                key = kv[0];
                val = decodeURIComponent(kv[1]);
                if (qs[key] === undefined) {
                    qs[key] = val;
                } else {
                    v = qs[key];
                    if (v.constructor !== Array) {
                        qs[key] = [];
                        qs[key].push(v);
                    }
                    qs[key].push(val);
                }
            }
        }
        return qs;
    }

    var pg = Querystring();
    console.log(pg);


    // disable button if on main page

    if (parseInt(pg.pg) <= 1) {
        $(".previousPage").prop('disabled', true);
    } else {
        $(".previousPage").prop('disabled', false);
    }

    $("#nextPage").on("click", function (e) {
        e.preventDefault();

        if (parseInt(pg.pg) >= 1) {

            parseInt(pg.pg)

            pg.pg++

                // change to next page
                window.location = "?pg=" + pg.pg;
        } else {
            // change to next page
            window.location = "?pg=" + page;
        }



    });

    $("#previousPage").on("click", function () {
        // change to next page
        if (pg.pg < 1) {
            pg.pg = 1;
        } else {

            parseInt(pg.pg)

            pg.pg--

                window.location = "?pg=" + pg.pg;
        }
    });
});