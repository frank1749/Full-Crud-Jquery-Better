var page = 1;
var current_page = 1;
var total_page = 0;
var is_ajax_fire = 0;


manageData();


/* manage data list */
function manageData() {
    $.ajax({
        dataType: 'json',
        url: url,
        data: {page:page}
    }).done(function(data){

    	total_page = data.last_page;
    	current_page = data.current_page;

    	$('#pagination').twbsPagination({
	        totalPages: total_page,
	        visiblePages: current_page,
	        onPageClick: function (event, pageL) {
	        	page = pageL;
                if(is_ajax_fire != 0){
	        	  getPageData();
                }
	        }
	    });


    	manageRow(data.data);
        is_ajax_fire = 1;
    });
}


$.ajaxSetup({
    headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
});


/* Get Page Data*/
function getPageData() {
	$.ajax({
    	dataType: 'json',
    	url: url,
    	data: {page:page}
	}).done(function(data){
		manageRow(data.data);
	});
}


/* Add new Item table row */
function manageRow(data) {
	var	rows = '';
	$.each( data, function( key, value ) {
	  	rows = rows + '<tr>';
        rows = rows + '<td>'+value.title+'</td>';
	  	rows = rows + '<td>'+value.ciudad+'</td>';
	  	rows = rows + '<td>'+value.description+'</td>';
	  	rows = rows + '<td data-id="'+value.id+'">';
                rows = rows + '<button data-toggle="modal" data-target="#edit-item" class="btn btn-primary edit-item" onclick="myEdit('+value.id+')">Edit</button> ';
                rows = rows + '<button class="btn btn-danger remove-item">Delete</button>';
                rows = rows + '</td>';
	  	rows = rows + '</tr>';
	});


	$("tbody").html(rows);
}


/* Create new Item */
$(".crud-submit").click(function(e){
    e.preventDefault();
    var form_action = $("#create-item").find("form").attr("action");
    var title = $("#create-item").find("input[name='title']").val();
    var id_ciudad = $( "#city" ).val();
 
    var description = $("#create-item").find("textarea[name='description']").val();


    $.ajax({
        dataType: 'json',
        type:'POST',
        url: form_action,
        data:{title:title, id_ciudad:id_ciudad, description:description}
    }).done(function(data){
        getPageData();
        $(".modal").modal('hide');
        toastr.success('Item Created Successfully.', 'Success Alert', {timeOut: 5000});
    });


});


/* Remove Item */
$("body").on("click",".remove-item",function(){
    if (confirm("Desea éliminar este registro?")) {

        var id = $(this).parent("td").data('id');
        var c_obj = $(this).parents("tr");
        $.ajax({
            dataType: 'json',
            type:'delete',
            url: url + '/' + id,
        }).done(function(data){
            c_obj.remove();
            toastr.success('Item Deleted Successfully.', 'Success Alert', {timeOut: 5000});
            getPageData();
        });

    }
});

function myEdit(id) {

    console.log(id);

    $.ajax({
        dataType: 'json',
        type:'GET',
        url: 'http://127.0.0.1:8000/edit_info/'+id,
    }).done(function(data){
        console.log(data);
        $( "#id_edit" ).val(data.id);
        $( "#title_edit" ).val(data.title);
        $('select option[value="'+data.id_ciudad+'"]').attr("selected",true);
        $( "#desc_edit" ).val(data.description);
    });
  
}

/* Updated new Item */
$(".crud-submit-edit").click(function(e){
    e.preventDefault();
    var form_action = $("#edit-item").find("form").attr("action");
    var title = $("#edit-item").find("input[name='title']").val();
    var id_ciudad = $( "#city_edit" ).val();
    var description = $("#edit-item").find("textarea[name='description']").val();
    var id_edit = $( "#id_edit" ).val();

    $.ajax({
        dataType: 'json',
        type:'PUT',
        url: form_action+id_edit,
        data:{title:title, id_ciudad:id_ciudad, description:description}
    }).done(function(data){
        getPageData();
        $(".modal").modal('hide');
        toastr.success('Item Updated Successfully.', 'Success Alert', {timeOut: 5000});
    });
});