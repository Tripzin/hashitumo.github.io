$(function(){
    function calom(nums){
        var diti = parseInt(nums[0]-1);
        var dni = parseInt(nums[1]-1);
        var dsan = parseInt(nums[2]-1);
        var dyon = parseInt(nums[3]-1);

        switch(dsan){
            case 7:
                dsan = -1;
                break;
            case 8:
                dsan = -2;
                break;
        }

        //誤差範囲
        switch(dyon){
            case 0:
                dyon = 1;
                break;
            case 1:
                dyon = 2;
                break;
            case 2:
                dyon = 5;
                break;
            case 3:
                dyon = 10;
            case 4:
                dyon = 20;
        }

        return String(Math.floor((diti*10+dni)*10**dsan*10)/10)+'Ω 誤差±'+dyon+"%";
    }

    var num_list = [];
    var color_list_ty0 = ['black','brown','red','orange','yellow',
                      'green','blue','magenta','gray','white'];
    var color_list_ty1 = ['brown','red','gold','silver','snow'];

    var color_list_ty2 = ['black','brown','red','orange','yellow',
    'green','blue','gold','silver'];

    $('.dram0').children('li').each(function(index){
        $(this).css('background',color_list_ty0[index]);
    });
    $('.dram1').children('li').each(function(index){
        $(this).css('background',color_list_ty0[index]);
    });
    $('.dram2').children('li').each(function(index){
        $(this).css('background',color_list_ty2[index]);
    });
    $('.dram3').children('li').each(function(index){
        $(this).css('background',color_list_ty1[index]);
    });


    
    $("#dram").children('div').each(function(index){
        $(this).flickEndless({
            vertical: true,
            increment:5,
            ratio:5
        ,
        onPageChange: function(){
            num_list[index] = this.page;
            var ans = calom(num_list);
            $('.ans').html(ans);
        }    
        });
    });
    //IOS用の設定
    function prevent(e){
        event.preventDefault();
    }
    document.addEventListener("touchstart",prevent,false);
    document.addEventListener("touchmove",prevent,false);
    document.addEventListener("touchend",prevent,false);
    document.addEventListener("gesturestart",prevent,false);
    document.addEventListener("gesturechange",prevent,false);
    document.addEventListener("gestureend",prevent,false);
  

});
