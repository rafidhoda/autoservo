    var chosen_service = false;
    var chosen_vask = false;
    var chosen_date = false;
    var chosen_dekk = false;
    
    var total_price = 0;
    var nok = ',-';
    var standard_price = 3690;
    var vip_price = 3990;
    var vask_price = 490;
    var dekk_price = 750;
    var olje_price = 1190;
    var dekk_standard_price = 400;
    var dekk_vip_price = 300;
    
        $('#datepicker').datepicker({
            format: "dd/mm/yyyy",
            weekStart: 1,
            startDate: "tomorrow",
            language: "nb",
            todayHighlight: false
        });
        $('#datepicker').on("changeDate", function() {
            chosen_date = true;
            $('#user_date').val(
        $('#datepicker').datepicker('getFormattedDate')
        );
        
        
        $("#time-select").val("");
        
        });
        
        $(function(){
    console.log('ready');
    
    
    
    
    
    
    $('.list-group a').click(function(e) {
        
        e.preventDefault()
        
        $that = $(this);
        
        $that.parent().find('a').removeClass('active');
        $that.addClass('active');
    });
});
    
function chooseService(service)
{
    chosen_service = true;
    
    if (service === "vask") {
    
        if (total_price === vask_price){
            total_price = 0;
            service = "";
        } else if (total_price === vask_price + dekk_price){
            total_price = dekk_price;
            service = "dekk";
        } else if (total_price === vask_price + olje_price){
            total_price = olje_price;
            service = "olje";
        } else if (total_price === vask_price + dekk_price + olje_price){
            total_price = dekk_price + olje_price;
            service = "dekk+olje";
        } else if (total_price === dekk_price) {
            total_price = dekk_price + vask_price;
            service = "vask+dekk";
        } else if (total_price === olje_price) {
            total_price = olje_price + vask_price;
            service = "vask+olje";
        } else if (total_price == dekk_price + olje_price) {
            total_price = vask_price + dekk_price + olje_price;
            service = "vask+dekk+olje";
        } else if (total_price === 0){
            total_price = vask_price;
            service = "vask";
        }
    } else if (service === "dekk") {

        if (total_price === dekk_price){
            total_price = 0;
            service = "";
        } else if (total_price === dekk_price + vask_price){
            total_price = vask_price;
            service = "vask";
        } else if (total_price === dekk_price + olje_price){
            total_price = olje_price;
            service = "olje";
        } else if (total_price === dekk_price + vask_price + olje_price){
            total_price = vask_price + olje_price;
            service = "vask+olje";
        } else if (total_price === vask_price) {
            total_price = vask_price + dekk_price;
            service = "vask+dekk";
        } else if (total_price === olje_price) {
            total_price = olje_price + dekk_price;
            service = "dekk+olje";
        } else if (total_price == vask_price + olje_price) {
            total_price = vask_price + dekk_price + olje_price;
            service = "vask+dekk+olje";
        } else if (total_price === 0) {
            total_price = dekk_price;
            service = "dekk";
        }
    } else if (service == "olje") {
        
        if (total_price === olje_price){
            total_price = 0;
            service = "";
        } else if (total_price === olje_price + dekk_price){
            total_price = dekk_price;
            service = "dekk";
        } else if (total_price === olje_price + vask_price){
            total_price = vask_price;
            service = "vask";
        } else if (total_price === vask_price + dekk_price + olje_price){
            total_price = dekk_price + vask_price;
            service = "vask+dekk";
        } else if (total_price === vask_price) {
            total_price = vask_price + olje_price;
            service = "vask+olje";
        } else if (total_price === dekk_price) {
            total_price = olje_price + dekk_price;
            service = "vask+olje";
        } else if (total_price == vask_price + dekk_price) {
            total_price = vask_price + dekk_price + olje_price;
            service = "vask+dekk+olje";
        } else if (total_price === 0){
            total_price = olje_price;
            service = "olje";
        }
        
    }
    
    document.getElementById('boldStuff').innerHTML = String(total_price) + nok;
    document.getElementById('price').value=total_price;
    document.getElementById('type').value=service;
};


var list_of_dates = $('#list_of_dates').val();
list_of_dates = list_of_dates.split(',');

var forms = document.getElementsByTagName('form');

function time_checker(){
    
    
    var user_date = $('#user_date').val();
    var user_time = $( "#time-select option:selected" ).text();
        
        if (list_of_dates.indexOf(user_date+user_time) !== -1){
                alert("Vi har dessverre ingen ledige timer på dette tidspunktet, vennligst velg et annet tidspunkt.");
                $("#time-select").val("");
        }
};



for (var i = 0; i < forms.length; i++) {
    
    forms[i].noValidate = true;

    forms[i].addEventListener('submit', function(event) {
        
        var user_date = $('#user_date').val();
        var user_time = $( "#time-select option:selected" ).text();
        
        
        //Prevent submission if checkValidity on the form returns false.
        if (!event.target.checkValidity() || chosen_service == false || chosen_date == false) {
            
            event.preventDefault();
            
            if (list_of_dates.indexOf(user_date+user_time) !== -1){
                alert("Du MÅ velge et annet tidspunkt for å gå videre");
            } else {
                alert("Alle felt må fylles ut");
            }

        }
        
        
    },  false);
    
};