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
    
    $("#nextPage").on("click", function (e) {
        e.preventDefault();
        // change to next page
        window.location.pathname = '/allScraped/' + "&#63;" +'pg=' + page++;
        page++
    });
    
    $("#previousPage").on("click", function () {
        // change to next page
        if (pg <= 1) {
            return;
        } else {
            window.location.pathname = "/allScraped/&#63;pg=" + page--;
            page--
        }
    });
});