$(function(){

   if (!Array.prototype.forEach) {
      Array.prototype.forEach = function (fn, scope) {  
         for (var i = 0, len = this.length; i < len; ++i) {
            fn.call(scope || this, this[i], i, this);
         }
      }
   } 
      
   /* 
      [ 특정 화면 사이즈 수치 조정에 대해 ]
      조건에서 지정한 사이즈보다 더 넓은 규격부터 브라우저에서 인식하는 현상을 고려,
      특정 함수에서는 화면 사이즈 수치를 다음과 같이 변경한다.
      992 → 975
      767 → 750
   */
   
   /* 내비게이션 ========================================== */
   /* gnb(PC) */
   // 1-1. click으로 작동할 경우
   $('.gnb > li > a').click(function(e){
      e.preventDefault();
      if($(this).find('span').hasClass('active')){
         $('.gnb-menu-wrap').removeClass('active');
         $('.gnb > li > a span').removeClass('active');
         $('.gnb-bg-dark').removeClass('on');
         if($(this).parent().hasClass('bg-long')){
            $('.gnb-bg').removeClass('active-long');
            $('.gnb-bg').removeClass('active-short');
         }else if($(this).parent().hasClass('bg-short')){
            $('.gnb-bg').removeClass('active-long');
            $('.gnb-bg').removeClass('active-short');
         }
      }else{
         $('.gnb-menu-wrap').removeClass('active');
         $('.gnb > li > a span').removeClass('active');
         $('.gnb-bg-dark').addClass('on');
         $(this).find('span').addClass('active');
         $(this).next().addClass('active');
         if($(this).parent().hasClass('bg-long')){
            $('.gnb-bg').removeClass('active-long');
            $('.gnb-bg').removeClass('active-short');
            $('.gnb-bg').addClass('active-long');
         }else if($(this).parent().hasClass('bg-short')){
            $('.gnb-bg').removeClass('active-long');
            $('.gnb-bg').removeClass('active-short');
            $('.gnb-bg').addClass('active-short');
         }
      }
   });
   //외부 영역을 클릭해서 내비게이션을 접을 수 있도록 함.
   $('.gnb-bg-dark').click(function(){
      if($(this).hasClass('on')){
         $('.gnb-bg-dark').removeClass('on');
         $('.gnb-menu-wrap').removeClass('active');
         $('.gnb > li > a span').removeClass('active');
         $('.gnb-bg').removeClass('active-long');
         $('.gnb-bg').removeClass('active-short');
      }
   })
   // 1-2.hover로 작동할 경우(불완전 therefore 사용 않음)
   // $('.gnb > li > a').on('mouseenter', function(e){
   //    e.preventDefault();
   //    $('.gnb-menu-wrap').removeClass('active');
   //    $('.gnb > li > a span').removeClass('active');
   //    $(this).find('span').addClass('active');
   //    $(this).next().addClass('active');
   //    if($(this).parent().hasClass('bg-long')){
   //       $('.gnb-bg').removeClass('active-long');
   //       $('.gnb-bg').removeClass('active-short');
   //       $('.gnb-bg').addClass('active-long');
   //    }else if($(this).parent().hasClass('bg-short')){
   //       $('.gnb-bg').removeClass('active-long');
   //       $('.gnb-bg').removeClass('active-short');
   //       $('.gnb-bg').addClass('active-short');
   //    }
   // });
   // $('header').on('mouseleave', function(e){
   //    e.preventDefault();
   //    $('.gnb-menu-wrap, .gnb > li > a span').removeClass('active');
   //    $('.gnb-bg').removeClass('active-long');
   //    $('.gnb-bg').removeClass('active-short');
   // })
   
   /* gnb-side(태블릿, 모바일) */
   // 1. 내비게이션 여닫기(초기: 1depth) & 배경 등장 & 하부 영역 우측으로 이동
   $('#btn-menu').click(function(e){
      e.preventDefault();
      $('#btn-menu i').toggleClass('sp-gnb-close');
      $('.gnb-side, .gnb-side-depth1').toggleClass('active');
      $('section').toggleClass('dim-on');
   });

   // 2. 1depth → 2depth 이동
   $('.gnb-side-depth1 a').click(function(e){
      e.preventDefault();
      $(this).parent().next().
      find('.gnb-side-todepth1 a, .gnb-side-depth2 > a').addClass('active');
      $('.gnb-side-depth1').hide();
   });

   // 3. 2depth → 1depth 이동
   $('.gnb-side-todepth1 a').click(function(e){
      e.preventDefault();
      if($(this).hasClass('active')){
         $(this).removeClass('active');
         $('.gnb-side-depth2 > a').removeClass('active');
         $('.gnb-side-depth1').show();
      }
   });

   // 4. 2depth → 3depth이동
   $('.gnb-side-depth2 a').click(function(e){
      e.preventDefault();
      $(this).next().find('.gnb-side-todepth2 a, .gnb-side-depth3 li')
      .addClass('active');
      if($(this).parents('.gnb-side-each').hasClass('gnb-side-bike')){
         $('.gnb-side-depth2 > a').hide();
      }else if($(this).parents('.gnb-side-each').hasClass('gnb-side-equip')){
         $('.gnb-side-depth2 >a').hide();
      }
   });

   // 5. 3depth → 2depth 이동
   $('.gnb-side-todepth2 a').click(function(e){
      e.preventDefault();
      if($(this).hasClass('active')){
         $(this).removeClass('active');
         $('.gnb-side-depth3 li').removeClass('active');
         $('.gnb-side-depth2 > a').show();
      }
   });

   /* 화면의 사이즈가 변경될 때 gnb의 상태를 초기화하기 */
   $(window).resize(function(){
      var windowWidth=$(window).width();
      if(windowWidth <= 992){
         $('.gnb > li > a span, .gnb-menu-wrap').removeClass('active');
         $('.gnb-bg.active-long').removeClass('active-long');
         $('.gnb-bg.active-short').removeClass('active-short');
         $('.gnb-bg-dark').removeClass('on');
      }else{
         $('#btn-menu i').removeClass('sp-gnb-close');
         $('.gnb-side, .gnb-side-depth1').removeClass('active');
         $('section').removeClass('dim-on');
      }
   })


   /* 화면 스크롤/휠 조작 이벤트 ========================================== */
   // 1. body에 클래스 'scroll' 부여
   //스크롤 조작 시
   var lastScrollTop = 0;
   $(window).scroll(function(){
      var state = $(this).scrollTop();
      // console.log(state, lastScrollTop);
      if(state > lastScrollTop){         
         //스크롤을 내릴 때
         $('body').addClass('scroll');
      }else{                  
         //스크롤을 올릴 때
         $('body').removeClass('scroll');
      }
      lastScrollTop = state;
      // var scrollStart=$('header').offset().top+1;
      // if(state > scrollStart){
      //    if(state > lastScrollTop){         
      //       //스크롤을 내릴 때
      //       $('body').addClass('scroll');
      //    }else{                  
      //       //스크롤을 올릴 때
      //       $('body').removeClass('scroll');
      //    }
      //    lastScrollTop = state;
      // }

      // 2. flagship 소개문 & 버튼
      var scrollTop=$(window).scrollTop();
      var flagshipMtbDown=$('.flagship-mtb').offset().top-450;
      var flagshipRoadDown=$('.flagship-road').offset().top-500;
      var flagshipMtbUp=$('.flagship-mtb').offset().top-395;
      var flagshipRoadUp=$('.flagship-road').offset().top-600;
      // 스크롤을 내리면 소개문과 버튼 나타남 & 음영 생김
      if(scrollTop > flagshipMtbDown){
         $('.flagship-mtb').addClass('active');
         if(scrollTop > flagshipRoadDown){
            $('.flagship-road').addClass('active');
         }
      }
      // 스크롤을 올리면 소개문과 버튼 사라짐 & 음영 사라짐
      if(scrollTop < flagshipRoadUp){
         $('.flagship-road').removeClass('active');
         if(scrollTop < flagshipMtbUp){
            $('.flagship-mtb').removeClass('active');
         }
      }

      // 3. promo-movie 타이틀 & 인트로 문구
      var movieDown=$('.promo-movie').offset().top-600;
      var movieUp=$('.promo-movie').offset().top-1000;
      if(scrollTop > movieDown){
         $('.promo-movie-bg, .promo-movie h2, .promo-movie iframe').
         addClass('active');
      }else if(scrollTop < movieUp){
         //iframe은 계속 상태를 유지하고 배경, 제목은 클래스 제거
         $('.promo-movie-bg, .promo-movie h2').removeClass('active');
      }

      // 4. syncntech 타이틀 & 인트로 문구
      var syncntechDown=$('.syncntech-wrap').offset().top-600;
      var syncntechUp=$('.syncntech-wrap').offset().top-1000;
      if(scrollTop > syncntechDown){
         var delay=0;
         $('.syncntech-intro').each(function(i, el){
            if(i==0){delay=0;}
            if(i==1){delay=400;}
            setTimeout(function(){
               $(el).addClass('active');}
            ,delay)
         })
      }
      else if(scrollTop < syncntechUp){
         $('.syncntech-intro').removeClass('active');
      }

      // 5. promo-parallax
      var parallaxDown=$('.promo-parallax-wrap').offset().top-500;
      var parallaxUp=$('.promo-parallax-wrap').offset().top-700;
      if(scrollTop > parallaxDown){
         $('.promo-parallax-bg').addClass('active');
      }else if(scrollTop < parallaxUp){
         $('.promo-parallax-bg').removeClass('active');
      }
   });
   
   //마우스 휠 조작 시
   $(window).on('mousewheel', function(e, delta){
      if(delta > 0){
         $('body').removeClass('scroll');
      }else if(delta < 0){
         $('body').addClass('scroll');
      }
   });


   /* main-slide ========================================== */
   // 1. 기본 세팅
   var setting={
      navigation: {
         nextEl: '.main-slide .slide-button.next',
         prevEl: '.main-slide .slide-button.prev',
      },
      pagination: {
         el: '.main-slide .swiper-pagination',
         clickable: true,
      },
      autoplay: {
         delay: 5000,
         disableOnInteraction: false,
      },
      effect: 'fade',
      loop:true,
   }
   var mainSwiper = new Swiper('.main-slide .swiper-container',setting);

   // 2. 재생/정지 버튼의 위치
   $(window).resize(function(){
      var paginationW=$('.main-slide .swiper-pagination').width();
      $('.main-slide #play-state').css('margin-right', paginationW/2 + 20);
   }).resize();
   
   // 3. 재생/정지 버튼 클릭 시 상태 변경
   $('#play-state').click(function(){
      if($(this).hasClass('fa-pause')){
         $(this).removeClass('fa-pause').addClass('fa-play');
         mainSwiper.autoplay.stop();
      }else{
         $(this).removeClass('fa-play').addClass('fa-pause');
         mainSwiper.autoplay.start();
      }
   });


   /* product : 제품 슬라이드 ========================================== */
   var setting={
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: {
         nextEl: '.product .slide-button.next button',
         prevEl: '.product .slide-button.prev button',
      },
      pagination: {
         el: '.product .swiper-pagination',
         type: 'progressbar',
         clickable: false,
      },
      effect: 'slide',
      loop:true,
      breakpoints: {
         360: {
            slidesPerView: 1.2,
            spaceBetween: 40,
            centeredSlides: true
         },
         768: {
            slidesPerView: 1,
            spaceBetween: 20,
            centeredSlides: false
         },
         980: {
            slidesPerView: 2,
            spaceBetween: 20,
            centeredSlides: false
         },
         1210: {
           slidesPerView: 3,
           spaceBetween: 20,
           centeredSlides: false
         }
      }
   }
   var productSwiper = new Swiper('.product .swiper-container',setting);


   /* 자회사 & 기술력 홍보 ========================================== */
   $('.syncros').on({
      'mouseenter': function(){
         var delay=0;
         $('.z-index').removeClass('active');
         $('.syncros').addClass('active');
         $('.s-ani').each(function(i, el){
            if(i==0){delay=0;}
            if(i==1){delay=0;}
            if(i==2){delay=50;}
            if(i==3){delay=70;}
            if(i==4){delay=90;}
            if(i==5){delay=110;}
            setTimeout(function(){
               $(el).addClass('active');}
            ,delay)
         })
      },
      'mouseleave': function(){
         var delay=0;
         $('.s-ani').each(function(i, el){
            if(i==0){delay=0;}
            if(i==1){delay=0;}
            if(i==2){delay=50;}
            if(i==3){delay=70;}
            if(i==4){delay=90;}
            if(i==5){delay=110;}
            setTimeout(function(){
               $(el).removeClass('active');}
            ,delay)
         })
      }
   })
   $('.carbonexp').on({
      'mouseenter': function(){
         var delay=0;
         $('.z-index').removeClass('active');
         $('.carbonexp').addClass('active');
         $('.c-ani').each(function(i, el){
            if(i==0){delay=0;}
            if(i==1){delay=0;}
            if(i==2){delay=50;}
            if(i==3){delay=50;}
            if(i==4){delay=80;}
            setTimeout(function(){
               $(el).addClass('active');}
            ,delay)
         })
      },
      'mouseleave': function(){
         var delay=0;
         $('.c-ani').each(function(i, el){
            if(i==0){delay=0;}
            if(i==1){delay=0;}
            if(i==2){delay=50;}
            if(i==3){delay=50;}
            if(i==4){delay=80;}
            setTimeout(function(){
               $(el).removeClass('active');}
            ,delay)
         })
      }
   })
   $('.innotech').on({
      'mouseenter': function(){
         var delay=0;
         $('.z-index').removeClass('active');       
         $('.innotech').addClass('active');
         $('.i-ani').each(function(i, el){
            if(i==0){delay=0;}
            if(i==1){delay=0;}
            if(i==2){delay=40;}
            if(i==3){delay=50;}
            if(i==4){delay=60;}
            if(i==5){delay=80;}
            if(i==6){delay=90;}
            if(i==7){delay=110;}
            setTimeout(function(){
               $(el).addClass('active');}
            ,delay)
         })
      },
      'mouseleave': function(){
         var delay=0;
         $('.i-ani').each(function(i, el){
            if(i==0){delay=0;}
            if(i==1){delay=0;}
            if(i==2){delay=40;}
            if(i==3){delay=50;}
            if(i==4){delay=60;}
            if(i==5){delay=80;}
            if(i==6){delay=90;}
            if(i==7){delay=110;}
            setTimeout(function(){
               $(el).removeClass('active');}
            ,delay)
         })
      }
   })


   /* 공지사항 리스트 롤링(모바일) ========================================== */
   /* 자동 롤링 & 아래/위 버튼으로 조작할 경우 */
   var play;
   $(window).resize(function(){
      var windowWidth=$(window).width();
      clearInterval(play);
      if(windowWidth <= 750){
         $('.notice-list').addClass('roll');
         play=setInterval(noticeMove, 3000);
         // 1. 화면 리사이즈 시 이전에 봤던 리스트가 맨 위로 가게 함
         var currentList=$('.notice-list li.current .notice-date').text();
         while($('.notice-list li:first-child .notice-date').text() !== currentList){
            $('.notice-list li:first-child').appendTo('.notice-list');
         }
      }else if(windowWidth > 750){
         //모바일 이외일 때에 롤링 無 & 리스트 순서 원상복귀
         clearInterval(play);
         $('.notice-list').removeClass('roll');
         while($('.notice-list li:first-child .notice-date').text() !== '2019.06.18'){
            $('.notice-list li:first-child').appendTo('.notice-list');
         }
      }
   })
   
   // 2. 버튼을 눌렀을 때 해당 방향으로 리스트를 하나씩 이동
   $('.notice .btn-group button').click(function(){
      //clearInterval(play); //버튼을 누르면 자동 롤링 정지
     if($(this).attr('id')=='down'){
        noticeMove();
     }else{
        $('.notice-list.roll').css('margin-top', -30);
        $('.notice-list.roll li').removeClass('current');
        $('.notice-list.roll li').last().addClass('current');
        $('.notice-list.roll li').last().prependTo('.notice-list');
        $('.notice-list.roll').stop(true).animate({'margin-top': 0})
     }
   })
   // 3. 리스트를 움직이는 함수
   function noticeMove(){
      $('.notice-list.roll').stop(true).animate({
         'margin-top':-30
      },function(){
         $('.notice-list.roll li').first().appendTo('.notice-list');
         $('.notice-list.roll li').removeClass('current');
         $('.notice-list.roll li').first().addClass('current');
         $('.notice-list.roll').css('margin-top', 0);
      })
   }

   /* 아래/위 버튼으로 수동 롤링할 경우 */
   // $(window).resize(function(){
   //    $('.btn-group button').off('click');
   //    var windowWidth=$(window).width();
   //    if(windowWidth <= 767){
   //       // 1. 리스트를 움직이는 함수
   //       function move(){
   //          $('.notice-list').stop(true).animate({
   //             'margin-top':-30
   //          },function(){
   //             $('.notice-list li').first().appendTo('.notice-list');
   //             $('.notice-list').css('margin-top', 0);
   //          })
   //       }
   
   //       // 2. 버튼을 눌렀을 때 해당 방향으로 리스트를 하나씩 이동
   //       $('.btn-group button').on('click',function(){
   //          if($(this).attr('id')=='down'){
   //             move();
   //          }else{
   //             $('.notice-list').css('margin-top', -30);
   //             $('.notice-list li').last().prependTo('.notice-list');
   //             $('.notice-list').stop(true).animate({'margin-top': 0})
   //          }
   //       })
   //    }else if(windowWidth > 767){
   //       // 3. 모바일 이외일 때에 리스트 순서 원상복귀
   //       while($('.notice-list li:first-child .notice-date').text() !== '2019.06.18'){
   //          $('.notice-list li:first-child').appendTo('.notice-list');
   //       }
   //    }
   // })


   /* 대리점 검색 입력창 리스트(document 외부) ========================================== */
   // 1. 리스트를 클릭해서 입력 창에 텍스트 띄우기 & 리스트 지움
   $('#keyword-search-result').on('click', 'li', function(e){
      e.preventDefault();
      var address=$(this).find('.key-search-address').text();
      var place=$(this).find('.key-search-place').text();
      $('.form-store input').val(address+' '+place);
      $('#keyword-search-result li').remove();
   });

   // 2. 지역 리스트에 스크롤 바 추가
   // $('.keyword-search .scrollbar-inner').scrollbar();


   /* 대리점 검색 셀렉트 카테고리 ========================================== */
   /* ajax로 json데이터를 로드하는 경우 */
   var district;
   // 1. 최초에 한 번 데이터 가져오기 & 첫번째 select 세팅
   $.ajax({
      url:'data/district.json',
      //로드 성공 시
      success:function(data){      
         district=data;        
         // console.log(data);
         data.forEach(function(obj){
            // console.log(Object.keys(obj)[0]);   
            $('#district-under').append('<option value="'+Object.keys(obj)[0]+'">'+Object.keys(obj)[0]+'</option>');   
         });
         // for (const i in data) {
         //    for (const key in data[i]) {
         //       $('#district-under').append('<option>'+key+'</option>');               
         //    }
         // }
      },
      //로드 실패 시
      error:function(jqXHR, textStatus, errorThrown){
         console.log(jqXHR);
         console.log(textStatus);
         console.log(errorThrown);
      }
   })
   //2. 두 번째 select의 값 변경하기
   $('#district-upper').change(function(){
      // console.log(district);
      var selectKey=$(this).val();      
      district.forEach(function(obj){
         var key=Object.keys(obj)[0];        
         if(selectKey==key){
            $('#district-result').empty();
            obj[key].forEach(function(name){               
               $('#district-result').append('<option>'+name+'</option>')
            });
         }  
      });
   })

   /* js 내부에 직접 데이터를 작성하는 경우 */
   // var district={
   //    광역지방:[
   //       "하위 구역"
   //    ],
   //    서울특별시:[
   //       "종로구", "중구", "용산구", "성동구", "광진구", "동대문구", "중랑구", "성북구", "강북구", "도봉구", "노원구", "은평구", "서대문구", "마포구", "양천구", "강서구", "구로구", "금천구", "영등포구", "동작구", "관악구", "서초구", "강남구", "송파구", "강동구"
   //    ],
   //    부산광역시:[
   //       "중구", "서구", "동구", "영도구", "부산진구", "동래구", "남구", "북구", "강서구", "해운대구", "사하구", "금정구", "연제구", "수영구", "사상구", "기장군"
   //    ],
   //    인천광역시:[
   //       "중구", "동구", "남구", "연수구", "남동구", "부평구", "계양구", "서구", "강화군", "옹진군"
   //    ],
   //    대구광역시:[
   //       "중구", "동구", "서구", "남구", "북구", "수성구", "달서구", "달성군"
   //    ],
   //    광주광역시:[
   //       "동구", "서구", "남구", "북구", "광산구"
   //    ],
   //    대전광역시:[
   //       "동구", "중구", "서구", "유성구", "대덕구"
   //    ],
   //    울산광역시:[
   //       "중구", "남구", "동구", "북구", "울주군"
   //    ],
   //    세종특별자치시:[
   //       "--------------------"
   //    ],
   //    경기도:[
   //       "가평군", "고양시", "과천시", "광명시", "광주시", "구리시", "군포시", "김포시", "남양주시", "동두천시", "부천시", "성남시", "수원시", "시흥시", "안산시", "안성시", "안양시", "양주시", "양평군", "여주시", "연천군", "오산시", "용인시", "의왕시", "의정부시", "이천시", "파주시", "평택시", "포천시", "하남시", "화성시"
   //    ],
   //    강원도:[
   //       "원주시", "춘천시", "강릉시", "동해시", "속초시", "삼척시", "홍천군", "태백시", "철원군", "횡성군", "평창군", "영월군", "정선군", "인제군", "고성군", "양양군", "화천군", "양구군"
   //    ],
   //    충청북도:[
   //       "청주시", "충주시", "제천시", "보은군", "옥천군", "영동군", "증평군", "진천군", "괴산군", "음성군", "단양군"
   //    ],
   //    충청남도:[
   //       "천안시", "공주시", "보령시", "아산시", "서산시", "논산시", "계룡시", "당진시", "금산군", "부여군", "서천군", "청양군", "홍성군", "예산군", "태안군"
   //    ],
   //    경상북도:[
   //       "포항시", "경주시", "김천시", "안동시", "구미시", "영주시", "영천시", "상주시", "문경시", "경산시", "군위군", "의성군", "청송군", "영양군", "영덕군", "청도군", "고령군", "성주군", "칠곡군", "예천군", "봉화군", "울진군", "울릉군"
   //    ],
   //    경상남도:[
   //       "창원시", "김해시", "진주시", "양산시", "거제시", "통영시", "사천시", "밀양시", "함안군", "거창군", "창녕군", "고성군", "하동군", "합천군", "남해군", "함양군", "산청군", "의령군"
   //    ],
   //    전라북도:[
   //       "전주시", "익산시", "군산시", "정읍시", "완주군", "김제시", "남원시", "고창군", "부안군", "임실군", "순창군", "진안군", "장수군", "무주군"
   //    ],
   //    전라남도:[
   //       "여수시", "순천시", "목포시", "광양시", "나주시", "무안군", "해남군", "고흥군", "화순군", "영암군", "영광군", "완도군", "담양군", "장성군", "보성군", "신안군", "장흥군", "강진군", "함평군", "진도군", "곡성군", "구례군"
   //    ],
   //    제주특별자치도:[
   //       "제주시", "서귀포시"
   //    ]
   // }
   // $('#district-upper').change(function(){
   //    $('#district-result').empty();
   //    var key=$(this).val();
   //    for(let index = 0; index < district[key].length; index++){
   //       $('#district-result').append('<option value="'+index+'">'
   //       +district[key][index]+'</option>');
   //    }
   // })
   // $('#district-upper').trigger('change');


   /* footer ========================================== */
   // 1. footer 메뉴 아코디언
   //화면의 사이즈가 변경될 때 .nav-footer .sub의 상태 조정
   $(window).resize(function(){
      $('.nav-footer > li').removeClass('open');
      var windowWidth=$(window).width();
      if(windowWidth < 751){
         $('.nav-footer .sub').hide();
      }else{
         $('.nav-footer .sub').show();
      }
   })
   //화살표 아이콘 클릭으로 메뉴 아코디언 조작
   $('.nav-footer > li .sub-name').click(function(e){
      e.preventDefault();
      if($(this).parents('li').hasClass('open')){
         $('.nav-footer > li').removeClass('open');
         $('.nav-footer .sub').slideUp();
      }else{
         $('.nav-footer > li').removeClass('open');
         $('.nav-footer .sub').slideUp();
         $(this).parents('li').addClass('open');
         $(this).parents('li').find('.sub').slideDown();
      }
   })
   // 2. TOP버튼
   //hover 시 i의 클래스 전환으로 모양 바뀜
   $('#btn-top').on({
      mouseenter:function(){
         $('#btn-top i').removeClass('sp-btntop-base');
         $('#btn-top i').addClass('sp-btntop-hover');
      },
      mouseleave:function(){
         $('#btn-top i').removeClass('sp-btntop-hover');
         $('#btn-top i').addClass('sp-btntop-base');
      }
   })
   //클릭하면 화면 최상단으로 이동하도록 함
   $('#btn-top').click(function(){
      $('html, body').animate({scrollTop:0}, 600);
      return false;
   });


   /* 검색 팝업(document 내부) ========================================== */
   // 1. 검색창 여닫기
   $('#search-open').click(function(e){
      e.preventDefault();
      $(this).find('i').toggleClass('sp-search-close sp-search-open');
      $('.popup-search, .form-search, .search-tab').toggleClass('open');
      $('.popup-search input').val('');
   });

   // 2. 최근/인기 검색어 탭 메뉴
   $('.tab-nav a').click(function(e){
      e.preventDefault();
      $('.tab-nav a').removeClass();
      $(this).addClass('active');

      var selectedTabId=$(this).attr('href');
      $('.tab-contents > div').hide();
      $(selectedTabId).show();
   });

   // 3. 인기 검색어를 입력창에 넣기
   $('#search-popular').on('click', 'button', function(e){
      e.preventDefault();
      var keyword=$(this).find('i').text();
      $('.form-search input').val(keyword);
   })

   // 4-1. 최근 검색어 스크롤바 처리
   $('.scrollbar-rail').scrollbar();

   // 4-2. 최근 검색어 기능
   // 최근 검색어 삭제
   $('#search-recent').on('click', 'button', function(){
      $(this).parent().remove();
      //저장소에서 지워야 할 키워드값 로드
      var keyword=$(this).prev().text();
      //저장소의 데이터 로드
      var popularwords=getpopularwords();
      //배열.splice(지워야 할 키워드의 인덱스 위치, 지울 인덱스의 개수)
      popularwords.splice(popularwords.indexOf(keyword),1);
      //변경된 배열 구조를 다시 저장소에 저장
      setpopularwords(popularwords);
      //리스트에 최근 검색어가 없을 경우 메시지 등장
      if(popularwords.length == 0){
         $('#search-recent').append('<p>최근 검색어가 없습니다.</p>');
      }else{
         $('#search-recent p').remove();
      }
   });
   // 최근 검색어 목록 로드
   var popularwords=getpopularwords();
   if(popularwords.length != 0){//최근 검색어가 있다면 작동
      for(var i in popularwords){
         $('#search-recent ul').
         append('<li><span class="dot"></span><a href="#">'+popularwords[i]+
         '</a><button class="sp sp-close-box"></button></li>');
      }
   }else{
      //최근 검색어가 없다면 메시지 등장
      $('#search-recent').append('<p>최근 검색어가 없습니다.</p>');
   }
   // 최근 검색어를 누르면 입력창에 내용 넣기
   $('#search-recent').on('click', 'a', function(e){
      e.preventDefault();
      var keyword=$(this).text();
      $('.form-search input').val(keyword);
   })


   /* 퀵 메뉴 ========================================== */
   // 1. quick-switch를 눌러 퀵메뉴 기본 열고 닫기
   $('.quick-switch').click(function(){
      $('.quick-menu').toggleClass('open');
      //퀵 메뉴를 닫을 때 최근 본 상품 목록이 접히도록 함
      if($('.quick-menu').hasClass('full')){
         $('.quick-menu').removeClass('full');
      }
   })

   // 2. quick-recent를 눌러 최근 본 상품 목록 열고 닫기
   $('.quick-recent').click(function(){
      $('.quick-menu').toggleClass('full');
   });

   // 3. quick-service 이하 세 버튼을 누르면 퀵 메뉴가 초기화되도록 함
   $('.quick-service, .quick-store, .quick-sign').click(function(){
      $('.quick-menu').removeClass('open', 'full');
   })

   // 4. 퀵 메뉴 TOP버튼으로 화면 최상단 이동
   $('#btn-top-quick').click(function(){
      $('html, body').animate({scrollTop:0}, 600);
      return false;
   });

   // 5. 퀵 메뉴의 초기 위치 & 스크롤 후의 위치 설정
   $(window).scroll(function(){
      var scrollTop=$(this).scrollTop();
      var qmStartPosition=$('.flagship-wrap').offset().top;      
      var windowWidth=$(window).width();    
      if(qmStartPosition-350 < scrollTop){
         //스크롤을 맨 위에서 특정 위치까지 내렸을 때
         if(windowWidth > 992){
            $('.quick-menu').css({
               'top':'50%',
               'bottom':'auto',
               'transform':'translateY(-50%)'
            });
         }else if(windowWidth > 767 && windowWidth <= 992){
            $('.quick-menu').css({
               'top':'auto',
               'bottom':'15px',
               'transform':'none'
            });
         }else if(windowWidth <= 767){
            $('.quick-menu').css({
               'top':'auto',
               'bottom':'10px',
               'transform':'none'
            });
         }
      }else{
         //스크롤을 특정 위치까지 올렸을 때
         //※ 태블릿, 모바일은 처음부터 화면 하단에 머무르도록 함
         if(windowWidth > 992){
            $('.quick-menu').css({
               'top':'85vh',
               'bottom':'auto',
               'transform':'none'
            });
         }else if(windowWidth > 767 && windowWidth <= 992){
            $('.quick-menu').css({
               'top':'auto',
               'bottom':'15px',
               'transform':'none'
            });
         }else if(windowWidth <= 767){
            $('.quick-menu').css({
               'top':'auto',
               'bottom':'10px',
               'transform':'none'
            });
         }
      }
   }).scroll();

   // 6. 최근 본 상품 목록을 버튼 입력으로 롤링 조작
   // 7. 최근 본 상품의 갯수와 현재 인덱스 매칭
   $('.quick-menu-recents-container button').on('click',function(){
      var windowWidth=$(window).width();
      var top, left, rcntProductPage;
      if(windowWidth > 975){
         top=-118;
         left=0;             
      }else if(windowWidth > 750 && windowWidth <= 975){
         top=0;
         left=-176;
      }else if(windowWidth <= 750){
         top=0;
         left=-116;             
      }
      if($(this).attr('id')=='arrow-next-quick'){
         $('.quick-menu-recents').stop(true).animate({
            'margin-top':top,
            'margin-left':left
         },function(){
            $('.quick-menu-recents li').first().appendTo('.quick-menu-recents');
            $('.quick-menu-recents').css({
               'margin-top':0,
               'margin-left':0
            });
            rcntProductPage=$('.quick-menu-recents li').eq(0).data('index')+1;
            $('.r-index-c').text(rcntProductPage);
         })               
      }else{
         $('.quick-menu-recents').css({
            'margin-top':top,
            'margin-left':left
         });
         $('.quick-menu-recents li').last().prependTo('.quick-menu-recents');
         $('.quick-menu-recents').stop(true).animate({
            'margin-top':0,
            'margin-left':0
         })
         rcntProductPage=$('.quick-menu-recents li').eq(0).data('index')+1;
         $('.r-index-c').text(rcntProductPage);
      }   
   })
   


   /* popup-notice ========================================== */
   // 1. 드래그로 팝업을 이동할 수 있게 함
   $('.popup-notice').draggable();

   // 2. 닫기 버튼을 클릭해서 팝업 끄기
   $('.popup-notice button').click(function(){
      $('.popup-notice').hide();
   });

   // 3. 태블릿, 모바일 화면에서 팝업 사라지게 하기
   var windowWidth=$(window).width();
   if(windowWidth<=992){
      $('.popup-notice').hide();
   }else{
      $('.popup-notice').show();
   }

   // 4. 체크박스를 클릭해서 하루 동안 팝업을 끌 수 있도록 함
   //참고 - https://mcatcher.github.io/2018/01/25/cookie.html
   $(".no-more-today input").click(function(){
      setCookieMobile("todayCookie","done",1);
      $(".popup-notice").hide();
   });
   function setCookieMobile(name,value,expiredays){
      var todayDate=new Date();
      todayDate.setDate(todayDate.getDate()+expiredays);
      document.cookie=name+"="+escape(value)+"; path=/; expires="+todayDate.toGMTString()+";"
   }
   function getCookieMobile(){
      var cookiedata=document.cookie;
      if(cookiedata.indexOf("todayCookie=done") < 0){
         // console.log('보여주기');
         $(".popup-notice").show();
         //태블릿, 모바일 환경에서는 팝업이 보이지 않게 처리
         if(windowWidth<=975){
            $('.popup-notice').hide();
         }
      }
      else{
         // console.log('숨기기');
         $(".popup-notice").hide();
      }
   }
   getCookieMobile();


   /* popup-sitemap ========================================== */
   // 1. 사이트맵 클릭으로 팝업 켜고 배경 드러내기
   $('header .sitemap button').click(function(){
      $('.popup-sitemap-wrap').fadeIn();
      $('.popup-sitemap-wrap').addClass('fade-in');
      $('body').addClass('sitemap-on');
   });

   // 2. 닫기 버튼, 배경 클릭으로 팝업 닫기
   $('.popup-sitemap .sp-close-box, .sitemap-bg-dark').click(function(){
      $('.popup-sitemap-wrap').fadeOut();
      $('.popup-sitemap-wrap').removeClass('fade-in');
      $('body').removeClass('sitemap-on');
   });

   // 3. 사이즈가 줄어들 때에 생기는 스크롤바 커스터마이징
   $('.popup-sitemap-contents.scrollbar-inner').scrollbar();

   // 4. 태블릿, 모바일 화면에서 팝업 사라지게 하기
   $(window).resize(function(){
      var windowWidth=$(window).width();
      if(windowWidth <= 992){
         $('.popup-sitemap, .sitemap-bg-dark').hide();
         $('.popup-sitemap-wrap').removeClass('fade-in');
         $('body').removeClass('sitemap-on');
      }
   })

});

/* 검색 팝업(document 외부) ========================================== */
// 저장소에서 키워드 가져오기
function getpopularwords(){
   var popularwords=[];
   var jsonpopularwords=localStorage.getItem('popularwords');
   //저장소에 값이 있으면 popularwords에 키워드값이 들어 있는 배열 구조를 넣고 반환
   if(jsonpopularwords != null){
      //json문자열 데이터를 object형태로 변환해서 가져옴
      popularwords=JSON.parse(jsonpopularwords);
   }
   //저장소에 값이 없으면 빈 배열 구조를 반환
   return popularwords;
}
// 저장소에 키워드 저장하기
function setpopularwords(popularwords){
   // object 형태 → json문자열 데이터
   var jsonpopularwords=JSON.stringify(popularwords);
   localStorage.setItem('popularwords',jsonpopularwords);
}
// 입력창에 검색어를 입력하고 검색 버튼을 누르면 
// 저장소에 키워드를 저장하고 키워드 목록에 붙이기
function search(){
   var keyword=$('.form-search input').val();
   if(keyword!=''){//키워드값이 비지 않음
      //저장소에서 데이터 가져오기(배열 구조)
      var popularwords=getpopularwords();
      //현재 입력한 키워드의 값을 배열에 들어 있는 값과 검사해서
      //일치하는 것이 없을 경우 저장소에 새로운 키워드를 저장함
      if(popularwords.indexOf(keyword) == -1){// = 중복되는 값을 찾지 못함
         //배열의 0번째 위치에 새로운 키워드를 저장
         popularwords.unshift(keyword);
         setpopularwords(popularwords);
         $('#search-recent ul').
         prepend('<li><span class="dot"></span><a href="#">'+keyword+
         '</a><button class="sp sp-close-box"></button></li>');
      }
      //배열에 키워드가 존재하면
      if(popularwords.length != 0){
         //'최근 검색어가 없습니다'를 제거
         $('#search-recent p').remove();
      }
   }
   $('.form-search input').val(''); //키워드 입력 후 입력창을 초기화함
}


/* 대리점 검색 자동 완성(document 외부) ========================================== */
function keyWordSearch(el){
   var keyword=el.value;
   if(keyword.length >= 1){
      var places = new kakao.maps.services.Places();
      var callback = function(result, status) {
         if (status === kakao.maps.services.Status.OK) {
            // console.log(result);
            $('#keyword-search-result').empty();
            result.forEach(function(el){
               $('#keyword-search-result').append(
                  '<li>'
                  +'<span class="key-search-address">'+el.address_name+'</span>'
                  +' / '
                  +'<span class="key-search-place">'+el.place_name+'</span>'
                  +'</li>'
               )
            });
         }
      };
      places.keywordSearch(keyword, callback, {size:10});
   }else if(keyword.length < 1){//input에 값이 없으면 리스트 삭제
      $('#keyword-search-result li').remove();
   }
}