


$(document).ready(function(){
  var dep1 = $('.li_dep1 > a');

  $(dep1).bind("click",function(){
          var dep2H = $(this).siblings('.gnblayer').children('div').find('.dep2Wrap').height();
          var lyH = dep2H + 25;
          $('.dep1').removeClass('active');
          $('.gnblayer').removeClass('on').css({'max-height':0, 'height':0});
          $('.insec').css({'left':'0','opacity':0,'top':0});
          $('.dep2Wrap').removeClass('active')
          $('.depwrap').removeClass('on').css({'max-height':0,'height':0});
          $(this).addClass('active');
          $(this).siblings('.gnblayer').addClass('on').css({'max-height':lyH, 'height':lyH});
          $(this).siblings('.gnblayer').children('div').find('.insec').css({'left':0,'opacity':1,'top':0});
          //$(this).siblings('.gnblayer').children('div').find('.lefTit').css('height',lyH);
          $(this).siblings('.gnblayer').children('.depwrap').addClass('on').css({'max-height':lyH, 'height':lyH});
          //$(this).siblings('.gnblayer').children('.depwrap').children('.dep2Wrap').addClass('active');
          $('.gnbBg').css({'height':0,'display':'block'});
          $('#forgnb').show().css({'opacity':1,'z-index':998});



  });
  $('#forgnb').bind("click",function(){
          $(this).css({'opacity':0,'z-index':-1}).hide();
          $('.depwrap').removeClass('on');
          $('.dep1').removeClass('active');
          $('.gnblayer').css({'max-height':0, 'height':0});
          $('.insec').css({'left':0,'opacity':0,'top':0});
          $('.depwrap').removeClass('on').css({'max-height':0,'height':0});
          $('.gnbBg').css({'height':0,'display':'none'});
  });
  var dep3 = $('.dep3.dep3_plus');
  $(dep3).bind("click",function(){
      $(this).toggleClass('dep3_close');
      $(this).siblings(".dep4Wrap").slideToggle();
      $(this).parents('.dep2Wrap').addClass('active');
  });

})


$(document).ready(function(){
  $('.selectpicker').selectpicker();
})

$(document).ready(function(){

  var row = $('.gridTbl tbody tr');
  $(row).bind("click",function(){
      $(this).siblings('tr').removeClass('tr_selected');
      $(this).addClass('tr_selected');
  });

})

// $( document ).ready( function() {
//         var tblRow =  $('.tableLayout');
//         $( tblRow ).each( function() {
//             var rowH = $(this).height();
//           $( this ).css('height',rowH);
//     } );
// } );

function resizeContents() {
      var fixH =  $('.fixH').outerHeight();
      var fixH2 =  $('.fixH2').outerHeight();
      var searchH = $('.cont-header').outerHeight();
      if(!$("div").hasClass('cont-header')){
          var searchH = 0;
      }
      var winH = $(window).outerHeight();
      var contH = winH - searchH - 43;
      $('.contentWrap > .contents').css('height',contH);
          $( '.contH' ).each( function() {
          $( this ).css('height',contH);
          });
      $('.row-2 .flexH').css('height',contH - fixH - 1);
      $('.row-3 .flexH').css('height',contH - fixH - fixH2 - 2);
      $('.tabRow-2 .flexH').css('height',contH - fixH - 57);//�� �덉뿉 �믪씠媛� flexsible�덉쓣��
  }

$(document).ready(function(){
$(window).resize(resizeContents);
  resizeContents();
});








// $(document).ready(function(){
//
//     if($('.searchTxt:disabled').length>0){
//     	$('.searchTxt:disabled').parent(".searchBox").siblings('.textBox').addClass('inputDis');
//     }
//
// })