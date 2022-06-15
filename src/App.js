import "./App.css";
import Header from "./Header.js";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper";
import { Routes, Route, useNavigate } from 'react-router-dom';
import moment from "moment";
import 'moment/locale/ko';
import itemsTotal from "./data/itemsTotal"
import ItemCard from "./ItemCard";

function App() {
  let navigate = useNavigate();

  let [selected, setSelected] = useState(true);

  let [togBtn, setTogBtn] = useState(false);
  let [modalIdx, setModalIdx] = useState(false);

  //court group listing
  let [courtGroup01, setCourtGroup01] = useState(false);
  let [courtGroup02, setCourtGroup02] = useState(false);
  let [courtGroup03, setCourtGroup03] = useState(false);
  let [courtGroup04, setCourtGroup04] = useState(false);
  let [courtGroup05, setCourtGroup05] = useState(false);

  let [courtGroup, setCourtGroup] = useState(null);
  let k;
  if (courtGroup01 === true) {
    k = ['open', 'block'];
  }
  else {
    k = ['', 'none'];
  }

  function itemsCourt() {
    let bucket = {
      center: [],
      east: [],
      west: [],
      south: [],
      north: []
    };

    itemsTotal.map((x, i) => {
      switch (x.court) {
        default:
          break;
        case '서울중앙지법':
          bucket.center.push(x);
          break;
        case '서울동부지법':
          bucket.east.push(x);
          break;
        case '서울서부지법':
          bucket.west.push(x);
          break;
        case '서울남부지법':
          bucket.south.push(x);
          break;
        case '서울북부지법':
          bucket.north.push(x);
          break;
      }
    })
    return bucket
  }

  console.log(itemsCourt());


  // price group listing

  let [priceGroup01, setPriceGroup01] = useState(false),
    [priceGroup02, setPriceGroup02] = useState(false),
    [priceGroup03, setPriceGroup03] = useState(false),
    [priceGroup04, setPriceGroup04] = useState(false),
    [priceGroup05, setPriceGroup05] = useState(false),
    [priceGroup06, setPriceGroup06] = useState(false),
    [priceGroup07, setPriceGroup07] = useState(false),
    [priceGroup08, setPriceGroup08] = useState(false),
    [priceGroup09, setPriceGroup09] = useState(false);

  function priceN(x, y) {
    let n = [];
    let h;
    for (let j = 0; j < itemsTotal.length; j++) {
      if (itemsTotal[j].price > x && itemsTotal[j].price <= y) {
        n.push(itemsTotal.price)
      }
    }
    n = n.length;
    h = String(n * 20) + "px";
    if (n === 0) { n = null };
    if (n > 15) { n = '15+'; h = '300px' }
    return [n, h];
  }

  let todayYYYYMMDD = moment().format('l');
  let [dateGroup, setDateGroup] = useState(todayYYYYMMDD);
  let dateClicked = [dateGroup.slice(0, 4), dateGroup.slice(5, 7), dateGroup.slice(8, 10)];

  function mmdd() {
    let mmClicked, ddClicked;
    if (dateGroup.slice(5, 6) === '0') {
      mmClicked = dateGroup.slice(6, 7);
    }
    else {
      mmClicked = dateGroup.slice(5, 7);
    }
    if (dateGroup.slice(8, 9) === '0') {
      ddClicked = dateGroup.slice(9, 10);
    }
    else {
      ddClicked = dateGroup.slice(8, 10);
    }
    return [mmClicked, ddClicked]
  }

  function toggler(x, setX) {
    setX(!x);
  }

  const todaydd = moment().format('dd');
  const todayMMM = moment().format('MMM');
  const todayYYYY = moment().format('YYYY') + '년';

  function calendar() {
    let ddBucket = [], lBucket = [];
    switch (todaydd) {
      case '일':
        for (let i = 0; i < 7; i++) {
          ddBucket.push(moment().add(i, 'days').format('dd'))
        };
        for (let j = -7; j < 21; j++) {
          lBucket.push(moment().add(j, 'days').format('l'));
        }
        break;
      case '월':
        for (let i = 0; i < 7; i++) {
          ddBucket.push(moment().add(i - 1, 'days').format('dd'))
        };
        for (let j = -7; j < 21; j++) {
          lBucket.push(moment().add(j - 1, 'days').format('l'));
        }
        break;
      case '화':
        for (let i = 0; i < 7; i++) {
          ddBucket.push(moment().add(i - 2, 'days').format('dd'))
        };
        for (let j = -7; j < 21; j++) {
          lBucket.push(moment().add(j - 2, 'days').format('l'));
        }
        break;
      case '수':
        for (let i = 0; i < 7; i++) {
          ddBucket.push(moment().add(i - 3, 'days').format('dd'))
        };
        for (let j = -7; j < 21; j++) {
          lBucket.push(moment().add(j - 3, 'days').format('l'));
        }
        break;
      case '목':
        for (let i = 0; i < 7; i++) {
          ddBucket.push(moment().add(i - 4, 'days').format('dd'))
        };
        for (let j = -7; j < 21; j++) {
          lBucket.push(moment().add(j - 4, 'days').format('l'));
        }
        break;
      case '금':
        for (let i = 0; i < 7; i++) {
          ddBucket.push(moment().add(i - 5, 'days').format('dd'))
        };
        for (let j = -7; j < 21; j++) {
          lBucket.push(moment().add(j - 5, 'days').format('l'));
        }
        break;
      case '토':
        for (let i = 0; i < 7; i++) {
          ddBucket.push(moment().add(i - 6, 'days').format('dd'))
        };
        for (let j = -7; j < 21; j++) {
          lBucket.push(moment().add(j - 6, 'days').format('l'));
        }
        break;
      default:
        break;
    }
    return [ddBucket, lBucket];
  }

  return (
    <div className="App">
      {/* HEADER */}
      <Header />

      {/* SIDEMENU. 접힐때 하얗게 되는거 수정 */}
      {togBtn === false ? (
        <div className="side-bg">
          <div
            className="bg-tog-t"
            onClick={() => toggler(togBtn, setTogBtn)}
          ></div>
          <div
            className="bg-tog-r"
            onClick={() => toggler(togBtn, setTogBtn)}
          >
            <i className='bx bxs-bookmark bx-rotate-270' ></i>
          </div>
          <div
            className="bg-tog-b"
            onClick={() => toggler(togBtn, setTogBtn)}
          ></div>
          <div className="sidemenu" id="sidemenu">
            <div className="container-sideHeader">
              <div className="divider"></div>
              <i
                className="bx bx-arrow-back"
                onClick={() => {
                  setTogBtn(!togBtn);
                }}
              ></i>
            </div>
          </div>
        </div>
      ) : (
        <div className="side-bg active">
          <div
            className="bg-tog-t"
            onClick={() => toggler(togBtn, setTogBtn)}
          ></div>
          <div
            className="bg-tog-r"
            onClick={() => toggler(togBtn, setTogBtn)}
          >
            <i className='bx bxs-bookmark bx-rotate-270' ></i>
          </div>
          <div
            className="bg-tog-b"
            onClick={() => toggler(togBtn, setTogBtn)}
          ></div>
          <div className="sidemenu active" id="sidemenu">
            <div className="container-sideHeader">
              <div className="divider"></div>

              <div className="divider"></div>

              <i
                className="bx bx-arrow-back"
                onClick={() => toggler(togBtn, setTogBtn)}
              ></i>
            </div>

            <div className="side-custom">
              <h1 className="side-title">Customize</h1>
              <div className="divider"></div>

              <details>
                <summary>지역</summary>
                <ul>
                  <li>수도권</li>
                  <li>강원</li>
                  <li>충청</li>
                  <li>경상</li>
                  <li>전라</li>
                  <li>제주</li>
                </ul>
              </details>
              <div className="divider"></div>
              <details>
                <summary>분류</summary>
                <ul>
                  <li>토지</li>
                  <li>아파트</li>
                  <li>주택</li>
                  <li>공장</li>
                  <li>기타</li>
                </ul>
              </details>
            </div>
            <div className="divider"></div>
            <div className="divider"></div>

            <h1 className="side-title">ICONS</h1>
            <div className="divider"></div>

            <div className="container-icons">
              <div className="side-icons">
                <div className="icon-frame">
                  <i className="bx bx-home-alt-2" onClick={() => { navigate("/"); setTogBtn(!togBtn); }}></i>
                  <p>Home</p>
                </div>

                <div className="icon-frame">
                  <i className="bx bxs-layer-plus"></i>
                  <p>New</p>
                </div>

                <div className="icon-frame">
                  <i className="bx bxs-map-pin" onClick={() => { navigate("/location"); setTogBtn(!togBtn); }}></i>
                  <p>Location</p>
                </div>

                <div className="icon-frame">
                  <i className="bx bxs-calendar" onClick={() => { navigate("/date"); setTogBtn(!togBtn); }}></i>
                  <p>Date</p>
                </div>

                <div className="icon-frame">
                  <i className='bx bx-dollar' onClick={() => { navigate("/price"); setTogBtn(!togBtn); }}></i>
                  <p>Price</p>
                </div>

                <div className="icon-frame">
                  <i className='bx bxs-category' onClick={() => { navigate("/news"); setTogBtn(!togBtn); }}></i>
                  <p>News</p>
                </div>
              </div>
              <div className="divider"></div>

              <div className="side-tags">
                <h1 className="side-title">tags</h1>
                <div className="divider"></div>
                <ul>
                  <li>#1억 미만</li>
                  <li>#아파트</li>
                  <li>#토지</li>
                  <li>#유찰</li>
                </ul>
              </div>
              <div className="divider"></div>
            </div>
          </div>
        </div>
      )}

      {/* 빌딩은 회검 토는 녹갈 아파트는 회하늘 주택은 주노? ... 컬러링 맞추기. */}
      {/* 서울 지도를 완만한 구면으로 만들어서 슬라이드 터치로 화면 가운데로 이동, 물건 수 보이기. */}

      <Routes>

        {/* NEW PAGE */}
        <Route path="/" element={
          <div className="body">
            {/* SECTION TITLE */}
            <div id="to-top"></div>
            <div div className="section-title">
              <h1>ITEMS</h1>
            </div>

            <div className="container-bodyBtns">
              {
                selected === true ?
                  (
                    <ul className="bodyBtns">
                      <li className="selected" onClick={() => { setSelected(true) }}>신건</li>
                      <li onClick={() => { setSelected(false) }}>전체보기</li>
                    </ul>
                  ) :
                  (
                    <ul className="bodyBtns">
                      <li onClick={() => { setSelected(true) }}>신건</li>
                      <li className="selected" onClick={() => { setSelected(false) }}>전체보기</li>
                    </ul>
                  )
              }
            </div>

            <div className="container-items">
              {/* ITEM CARDS */}
              {
                selected === true ?
                  (
                    // eslint-disable-next-line array-callback-return
                    itemsTotal.map(function (x, i) {
                      if (x.miss === 0) {
                        let a = x;
                        return (
                          <ItemCard x={a} key={i} />
                        );
                      }
                    })
                  ) :
                  (
                    itemsTotal.slice(0, 10).map((x, i) => {

                      return (
                        <ItemCard x={x} key={i} />
                      );
                    })
                  )

              }
            </div>
          </div >
        } />


        < Route path="/location" element={
          < div className="body" >
            {/* SECTION TITLE */}
            <div id="to-top"></div>
            < div className="section-title">
              <h1>LOCATION</h1>
            </div >

            <div className="container-bodyBtns">
              <ul className="bodyBtns">
                <li className="selected" onClick={() => { }}>서울</li>
                <li onClick={() => { }}>경기 인천</li>
                <li onClick={() => { }}>수도권 외</li>
              </ul>
            </div>


            {/* Seoul map */}
            <div className="container-map-seoul">
              <div className="location-inform">
                <h4 className="location-name">관할법원별 물건보기</h4>
                <i className="modalBtn fa-regular fa-circle-question" onClick={() => { setModalIdx(!modalIdx) }}></i>
              </div>
              <svg
                version="1.1" className="seoul" id="seoul"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 900 750">
                <a href="#court-center"><g id="center" onClick={() => { setCourtGroup01(!courtGroup01) }}>
                  <polygon id="joong" className="st0" points="419.8,385 506.8,409 539.8,346 416.8,354.9 	" />
                  <polygon id="jongno" className="st0" points="536.8,341 413.8,349.9 406.8,278 368.2,252.5 434.8,187 467.8,279 	" />
                  <polygon id="seocho" className="st0" points="457.5,514 493.8,509 523.8,470 554.2,561 608.8,608 656.8,590 690.8,633 608.8,711 
		559.8,677 549.8,622 473.8,615 452,590.5 	"/>
                  <polygon id="dongjak" className="st0" points="298.9,566 403.8,548 425.8,589.5 449,589.5 454.5,513 411.8,507 376.6,483 329.8,512 	
		"/>
                  <polygon id="gwanak" className="st0" points="337.8,658 383.8,687 469.8,618 448,593.5 424.8,593.5 402.8,552 297.9,570 	" />
                  <polygon id="gangnam" className="st0" points="525.8,466 552.8,448 581.8,448 630.8,484 639.8,515 701.8,549 749.8,604 692.8,629 
		658.8,586 610.8,604 556.2,557 	"/>
                </g></a>
                <a href="#court-east"><g id="east" onClick={() => { setCourtGroup02(!courtGroup02) }}>
                  <polygon id="j" className="st0" points="633.8,482 704.8,464 728.8,424 779.8,488 811.8,522 752.8,602 704.8,547 642.8,513 	" />
                  <polygon id="k" className="st0" points="511.8,412 532.2,440 572,426 611.8,447 640.8,378 544.8,349 	" />
                  <polygon id="l" className="st0" points="710.8,379 710.8,418 691.8,454 640.3,466 614.8,448 643.8,379 658.8,358.9 705.8,338.7 	" />
                  <polygon id="m" className="st0" points="729.8,368.5 841.8,313.2 859.8,395.3 810.8,420 780.8,483 729.8,419 	" />
                </g></a>
                <a href="#court-west"><g id="west" onClick={() => { setCourtGroup03(!courtGroup03) }}>
                  <polygon id="o" className="st0" points="382.8,131 301.8,161 269.8,293 291.9,320.7 429.8,185 	" />
                  <polygon id="p" className="st0" points="525.2,440 476.2,489 417.8,485 370.8,453 417.8,388 504.8,412 	" />
                  <polygon id="q" className="st0" points="403.8,280 413.8,382 334.8,376 293.9,324.7 365.2,254.5 	" />
                  <polygon id="r" className="st0" points="206.8,334 271.8,301 334.8,380 413.8,386 366.8,451 	" />
                </g></a>
                <a href="#court-south"><g id="south" onClick={() => { setCourtGroup04(!courtGroup04) }}>
                  <polygon id="t" className="st0" points="264.8,406.1 373.6,481 326.8,510 295.9,564 249.8,491 	" />
                  <polygon id="u" className="st0" points="131.8,447 125.8,489 155.8,519 246.8,489 261.8,404.1 199.8,412 181.8,447 	" />
                  <polygon id="v" className="st0" points="227.8,556 300.2,585.3 332.8,657 285.8,691 246.8,629 	" />
                  <polygon id="w" className="st0" points="300.2,582.3 292.9,566 246.8,493 155.8,523 125.8,493 115.8,582 174.8,589.5 227.8,553 	" />
                  <path id="x" className="st0" d="M116.8,294c-33,30.3-66,60.7-99,91l58,43l35-6l20,22h50l18-35l62-7.9
		C212.8,365.4,164.8,329.7,116.8,294z"/>
                </g></a>
                <a href="#court-north"><g id="north" onClick={() => { setCourtGroup05(!courtGroup05) }}>
                  <polygon id="a_x60_" className="st0" points="733.8,230.9 733.8,291 709.8,332.7 662.8,352.9 647.8,255.5 709.8,217 	" />
                  <polygon id="aa" className="st0" points="459.5,180 557.8,249 592.8,228.9 639.8,253.5 531.2,330.7 474.8,280 441.8,188 	" />
                  <polygon id="ab" className="st0" points="643.8,374 547.8,345 535.2,333.7 643.8,256.5 658.8,353.9 	" />
                  <polygon id="ac" className="st0" points="524.2,12 603.8,52 613.8,161 574,193.6 533.8,138 504.8,52 	" />
                  <polygon id="ad" className="st0" points="656.8,30 690.8,67 680.8,132 708.8,213 646.8,251.5 599.8,226.9 578,196.6 617.8,164 
		607.8,55 	"/>
                  <polygon id="ae" className="st0" points="500.8,52 448.8,117 458.5,175 556.8,244 591.8,223.9 529.8,138 	" />
                </g></a>
              </svg>
              {
                modalIdx === false ?
                  (
                    <div className="color-index">
                      <ul>
                      </ul>
                    </div>
                  ) :
                  (
                    <div className="color-index active">
                      <ul>
                        <li><span>ㅁㅁ</span> 서울중앙지법</li>
                        <li><span>ㅁㅁ</span> 서울동부지법</li>
                        <li><span>ㅁㅁ</span> 서울서부지법</li>
                        <li><span>ㅁㅁ</span> 서울남부지법</li>
                        <li><span>ㅁㅁ</span> 서울북부지법</li>
                      </ul>
                    </div>
                  )
              }
            </div>

            <div className="container-cards">
              <div className={'label-court center ' + k[0]} >
                <div className="state">
                  <ul>
                    <li>강남구</li>
                    <li>서초구</li>
                    <li>종로구</li>
                    <li>중구</li>
                    <li>동작구</li>
                    <li>관악구</li>
                  </ul>
                </div>
                <div className="court">
                  <span>서울중앙지법</span>
                  {/* <i className='bx bx-menu'></i> */}
                </div>
                <div className="label-court-dummy" id="court-center"></div>
                <i className='close-btn bx bxs-x-square' style={{ display: k[1] }} onClick={() => { setCourtGroup01(false) }}></i>
              </div>
              {
                courtGroup01 === true ?
                  (
                    // eslint-disable-next-line array-callback-return
                    itemsTotal.map(function (x, i) {
                      if (x.court === '서울중앙지법') {
                        let a = x;
                        return (
                          <div style={{ background: "#06D6A044" }}>
                            <ItemCard x={a} key={i} />
                          </div>
                        );
                      }
                    })
                  ) : null
              }

              {/* courtGroup02 */}
              {
                courtGroup02 === false ?
                  (<div className="label-court east">
                    <div className="state">
                      <ul>
                        <li>송파구</li>
                        <li>강동구</li>
                        <li>성동구</li>
                        <li>광진구</li>
                      </ul>
                    </div>
                    <div className="court">
                      <span>서울동부지법</span>
                      {/* <i className='bx bx-menu'></i> */}
                    </div>
                    <div className="label-court-dummy" id="court-east"></div>
                  </div>
                  ) :
                  (
                    <div className="label-court east open" >
                      <div className="state">
                        <ul>
                          <li>송파구</li>
                          <li>강동구</li>
                          <li>성동구</li>
                          <li>광진구</li>
                        </ul>
                      </div>
                      <div className="court">
                        <span>서울동부지법</span>
                        {/* <i className='bx bx-menu'></i> */}
                      </div>
                      <div className="label-court-dummy" id="court-east"></div>
                      <i className='close-btn bx bxs-x-square' style={{ color: "#fff" }} onClick={() => { setCourtGroup02(false) }}></i>
                    </div>

                  )
              }
              {
                courtGroup02 === true ?
                  (
                    // eslint-disable-next-line array-callback-return
                    itemsTotal.map(function (x, i) {
                      if (x.court === '서울동부지법') {
                        let a = x;
                        return (
                          <>
                            <div style={{ background: "#6a4c9344" }}>
                              <ItemCard x={a} key={i} />
                            </div>
                          </>

                        );
                      }
                    })
                  ) : null
              }

              {/* courtGroup03 */}
              {
                courtGroup03 === false ?
                  (<div className="label-court west">
                    <div className="state">
                      <ul>
                        <li>용산구</li>
                        <li>마포구</li>
                        <li>서대문구</li>
                        <li>은평구</li>
                      </ul>
                    </div>
                    <div className="court"><span>서울서부지법</span></div>
                    <div className="label-court-dummy" id="court-west"></div>
                  </div>
                  ) :
                  (
                    <div className="label-court west open" >
                      <div className="state">
                        <ul>
                          <li>용산구</li>
                          <li>마포구</li>
                          <li>서대문구</li>
                          <li>은평구</li>
                        </ul>
                      </div>
                      <div className="court">
                        <span>서울서부지법</span>
                        {/* <i className='bx bx-menu'></i> */}
                      </div>
                      <div className="label-court-dummy" id="court-west"></div>
                      <i className='close-btn bx bxs-x-square' onClick={() => { setCourtGroup03(false) }}></i>
                    </div>
                  )
              }
              {
                courtGroup03 === true ?
                  (
                    // eslint-disable-next-line array-callback-return
                    itemsTotal.map((x, i) => {
                      if (x.court === '서울서부지법') {
                        let a = x;
                        return (
                          <div style={{ background: "#FFD16633" }}>
                            <ItemCard x={a} key={i} />
                          </div>
                        )
                      }
                    })
                  ) : null
              }

              {/* courtGroup04 */}
              {
                courtGroup04 === false ?
                  (<div className="label-court south">
                    <div className="state">
                      <ul>
                        <li>영등포구</li>
                        <li>양천구</li>
                        <li>강서구</li>
                        <li>구로구</li>
                        <li>금천구</li>
                      </ul>
                    </div>
                    <div className="court"><span>서울남부지법</span></div>
                    <div className="label-court-dummy" id="court-south"></div>
                  </div>
                  ) :
                  (
                    <div className="label-court south open" >
                      <div className="state">
                        <ul>
                          <li>영등포구</li>
                          <li>양천구</li>
                          <li>강서구</li>
                          <li>구로구</li>
                          <li>금천구</li>
                        </ul>
                      </div>
                      <div className="court">
                        <span>서울남부지법</span>
                        {/* <i className='bx bx-menu'></i> */}
                      </div>
                      <div className="label-court-dummy" id="court-south"></div>
                      <i className='close-btn bx bxs-x-square' onClick={() => { setCourtGroup04(false) }}></i>
                    </div>
                  )
              }
              {
                courtGroup04 === true ?
                  (
                    // eslint-disable-next-line array-callback-return
                    itemsTotal.map(function (x, i) {
                      if (x.court === '서울남부지법') {
                        let a = x;
                        return (
                          <div style={{ background: "#F7982444" }}>
                            <ItemCard x={a} key={i} />
                          </div>
                        );
                      }
                    })
                  ) : null
              }

              {/* courtGroup05 */}
              {
                courtGroup05 === false ?
                  (<div className="label-court north">
                    <div className="state">
                      <ul>
                        <li>강북구</li>
                        <li>노원구</li>
                        <li>도봉구</li>
                        <li>성북구</li>
                        <li>중랑구</li>
                        <li>동대문구</li>
                      </ul>
                    </div>
                    <div className="court"><span>서울북부지법</span></div>
                    <div className="label-court-dummy" id="court-north"></div>
                  </div>
                  ) :
                  (
                    <div className="label-court north open" >
                      <div className="state">
                        <ul>
                          <li>강북구</li>
                          <li>노원구</li>
                          <li>도봉구</li>
                          <li>성북구</li>
                          <li>중랑구</li>
                          <li>동대문구</li>
                        </ul>
                      </div>
                      <div className="court">
                        <span>서울북부지법</span>
                        {/* <i className='bx bx-menu'></i> */}
                      </div>
                      <div className="label-court-dummy" id="court-south"></div>
                      <i className='close-btn bx bxs-x-square' onClick={() => { setCourtGroup05(false) }}></i>
                    </div>
                  )
              }
              {
                courtGroup05 === true ?
                  (
                    // eslint-disable-next-line array-callback-return
                    itemsTotal.map((x, i) => {
                      if (x.court === '서울북부지법') {
                        let a = x;
                        return (
                          <div style={{ background: "#ff595e44" }}>
                            <ItemCard x={a} key={i} />
                          </div>
                        )
                      }
                    })
                  ) : null
              }
            </div>

            <div className="divider"></div>
          </div >
        } />

        < Route path="/price" element={
          < div className="body" >
            {/* SECTION TITLE */}
            <div id="to-top"></div>
            < div className="section-title">
              <h1>PRICE</h1>
            </div >

            <div className="container-price">
              <div className="label-price price01" onClick={() => toggler(priceGroup01, setPriceGroup01)}>
                <div className="price">
                  <div>~ 1천만원</div>
                  <div className="price-chart" style={{ width: priceN(0, 0.1e8)[1] }}>
                    <div className="price-n">{priceN(0, 0.1e8)[0]}</div>
                  </div>
                </div>
              </div>
              {
                priceGroup01 === true ?
                  (
                    // eslint-disable-next-line array-callback-return
                    itemsTotal.map(function (x, i) {
                      if (x.price <= 0.1e8) {
                        let a = x;
                        return (
                          <ItemCard x={a} key={i} />
                        );
                      }
                    })
                  ) : null
              }

              <div className="label-price price02" onClick={() => toggler(priceGroup02, setPriceGroup02)}>
                <div className="price">
                  <div>~ 5천만원</div>
                </div>
                <div className="price-chart" style={{ width: priceN(0.1e8, 0.5e8)[1] }}>
                  <div className="price-n">{priceN(0.1e8, 0.5e8)[0]}</div>
                </div>
              </div>
              {
                priceGroup02 === true ?
                  (
                    // eslint-disable-next-line array-callback-return
                    itemsTotal.map(function (x, i) {
                      if (x.price > 0.1e8 && x.price <= 0.5e8) {
                        let a = x;
                        return (
                          <ItemCard x={a} key={i} />
                        );
                      }
                    })
                  ) : null
              }

              <div className="label-price price03" onClick={() => toggler(priceGroup03, setPriceGroup03)}>
                <div className="price">
                  <div>~ 1억원</div>
                </div>
                <div className="price-chart" style={{ width: priceN(0.5e8, 1e8)[1] }}>
                  <div className="price-n">{priceN(0.5e8, 1e8)[0]}</div>
                </div>
              </div>
              {
                priceGroup03 === true ?
                  (
                    // eslint-disable-next-line array-callback-return
                    itemsTotal.map(function (x, i) {
                      if (x.price > 0.5e8 && x.price <= 1e8) {
                        let a = x;
                        return (
                          <ItemCard x={a} key={i} />
                        );
                      }
                    })
                  ) : null
              }

              <div className="label-price price04" onClick={() => toggler(priceGroup04, setPriceGroup04)}>
                <div className="price">
                  <div>~ 5억원</div>
                </div>
                <div className="price-chart" style={{ width: priceN(1e8, 5e8)[1] }}>
                  <div className="price-n">{priceN(1e8, 5e8)[0]}</div>
                </div>
              </div>
              {
                priceGroup04 === true ?
                  (
                    // eslint-disable-next-line array-callback-return
                    itemsTotal.map(function (x, i) {
                      if (x.price > 1e8 && x.price <= 5e8) {
                        let a = x;
                        return (
                          <ItemCard x={a} key={i} />
                        );
                      }
                    })
                  ) : null
              }

              <div className="label-price price05" onClick={() => toggler(priceGroup05, setPriceGroup05)}>
                <div className="price">
                  <div>~ 10억원</div>
                </div>
                <div className="price-chart" style={{ width: priceN(5e8, 10e8)[1] }}>
                  <div className="price-n">{priceN(5e8, 10e8)[0]}</div>
                </div>
              </div>
              {
                priceGroup05 === true ?
                  (
                    // eslint-disable-next-line array-callback-return
                    itemsTotal.map(function (x, i) {
                      if (x.price > 5e8 && x.price <= 10e8) {
                        let a = x;
                        return (
                          <ItemCard x={a} key={i} />
                        );
                      }
                    })
                  ) : null
              }

              <div className="label-price price06" onClick={() => toggler(priceGroup06, setPriceGroup06)}>
                <div className="price">
                  <div>~ 20억원</div>
                </div>
                <div className="price-chart" style={{ width: priceN(10e8, 20e8)[1] }}>
                  <div className="price-n">{priceN(10e8, 20e8)[0]}</div>
                </div>
              </div>
              {
                priceGroup06 === true ?
                  (
                    // eslint-disable-next-line array-callback-return
                    itemsTotal.map(function (x, i) {
                      if (x.price > 10e8 && x.price <= 20e8) {
                        let a = x;
                        return (
                          <ItemCard x={a} key={i} />
                        );
                      }
                    })
                  ) : null
              }

              <div className="label-price price07" onClick={() => toggler(priceGroup07, setPriceGroup07)}>
                <div className="price">
                  <div>~ 50억원</div>
                </div>
                <div className="price-chart" style={{ width: priceN(20e8, 50e8)[1] }}>
                  <div className="price-n">{priceN(20e8, 50e8)[0]}</div>
                </div>
              </div>
              {
                priceGroup07 === true ?
                  (
                    // eslint-disable-next-line array-callback-return
                    itemsTotal.map(function (x, i) {
                      if (x.price > 20e8 && x.price <= 50e8) {
                        let a = x;
                        return (
                          <ItemCard x={a} key={i} />
                        );
                      }
                    })
                  ) : null
              }

              <div className="label-price price08" onClick={() => toggler(priceGroup08, setPriceGroup08)}>
                <div className="price">
                  <div>~ 100억원</div>
                </div>
                <div className="price-chart" style={{ width: priceN(50e8, 100e8)[1] }}>
                  <div className="price-n">{priceN(50e8, 100e8)[0]}</div>
                </div>
              </div>
              {
                priceGroup08 === true ?
                  (
                    // eslint-disable-next-line array-callback-return
                    itemsTotal.map(function (x, i) {
                      if (x.price > 50e8 && x.price <= 100e8) {
                        let a = x;
                        return (
                          <ItemCard x={a} key={i} />
                        );
                      }
                    })
                  ) : null
              }

              <div className="label-price price09" onClick={() => toggler(priceGroup09, setPriceGroup09)}>
                <div className="price">
                  <div>100억원 이상</div>
                </div>
                <div className="container-barchart">
                  <div className="price-chart" style={{ width: priceN(100e8, Infinity)[1] }}>
                    <div className="price-n">{priceN(100e8, Infinity)[0]}</div>
                  </div>
                </div>
              </div>
              {
                priceGroup09 === true ?
                  (
                    // eslint-disable-next-line array-callback-return
                    itemsTotal.map(function (x, i) {
                      if (x.price > 100e8) {
                        let a = x;
                        return (
                          <ItemCard x={a} key={i} />
                        );
                      }
                    })
                  ) : null
              }
            </div>
            <div className="divider"></div>
          </div >
        } />

        < Route path="/date" element={
          < div className="body" >
            {/* SECTION TITLE */}
            < div className="section-title">
              <h1>DATE</h1>
              <h1>{todayYYYY} {todayMMM}</h1>
            </div>
            <div className="container-calendar">
              <div className="frame-date">
                {
                  calendar()[0].map((x, i) => {
                    return (
                      <div className="dddd" key={i}><span>{x}</span></div>
                    )
                  })
                }
              </div>
              <div className="frame-date">
                {
                  calendar()[1].map((x, i) => {

                    let n = [];
                    for (let j = 0; j < itemsTotal.length; j++) {
                      if (x === itemsTotal[j].upDate[itemsTotal[j].upDate.length - 1][0]) { n.push(x) }
                    }
                    let z = n.length;

                    let today = parseInt(moment().format('D'));
                    let thisMonth = parseInt(moment().format('M'));
                    let y = parseInt(x.slice(8, x.length - 1));
                    let m = parseInt(x.slice(6, 8));
                    if (m <= thisMonth && y < today) {
                      return (
                        <div className="days past" key={i} onClick={() => {
                          setDateGroup(x); console.log(dateGroup);
                        }}>                          <p className="calendar-dd">{y}</p>
                          <p className="calendar-n">{z === 0 ? null : z}</p></div>
                      )
                    }
                    else if (m > thisMonth || y > today) {
                      return (
                        <div className="days" key={i} onClick={() => {
                          setDateGroup(x); console.log(dateGroup);
                        }}>
                          <p className="calendar-dd">{y}</p>
                          <p className="calendar-n">{z === 0 ? null : z}</p>  </div>
                      )
                    }
                    else {
                      return (
                        <div className="days today" key={i} onClick={() => {
                          setDateGroup(x); console.log(dateGroup);
                        }}>
                          <p className="calendar-dd">{y}</p>
                          <p className="calendar-n">{z === 0 ? null : z}</p>
                        </div>
                      )
                    }
                  })
                }
              </div>
            </div>
            <div className="divider"></div>

            <div className="container-bubble">
              <div className="speech-bubble">
                <p>
                  지금으로부터 <span>{moment(dateClicked[0] + dateClicked[1] + dateClicked[2], "YYYYMMDD").fromNow()}</span> ,
                </p>
                <p>
                  경매일이 <span>{mmdd()[0]}월 {mmdd()[1]}일</span>인 물건들입니다.
                </p>
              </div>
            </div>
            <div className="divider"></div>

            {
              // eslint-disable-next-line array-callback-return
              itemsTotal.map(function (x, i) {
                if (x.upDate[x.upDate.length - 1][0] === dateGroup) {
                  let a = x;
                  return (
                    <>
                      <ItemCard x={a} key={i} />
                    </>
                  );
                }
              })
            }
            <div className="divider"></div>

          </div >
        } />

        < Route path="/news" element={
          < div className="body" >
            {/* SECTION TITLE */}
            <div id="to-top"></div>
            < div className="section-title">
              <h1>AUCTION NEWS</h1>
            </div>
          </div >
        } />

      </Routes >


      {/* FOTTER */}
      < div className="footer-watched" >
        <div className="footer-title">
          <p>watched</p>
          <a className="to-top" href="#to-top">
            <i className='bx bx-arrow-to-top'></i>
          </a>
        </div>
        <Swiper
          slidesPerView={4.5}
          spaceBetween={5}
          freeMode={false}
          // pagination={{
          //   clickable: true,
          // }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="watched-cell">
              <i className="bx bxs-buildings"></i>
              <p>서울 종로구1</p>
              <p>100.5억</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="watched-cell">
              <i className="bx bxs-buildings"></i>
              <p>서울 종로구2</p>
              <p>100.5억</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="watched-cell">
              <i className="bx bxs-buildings"></i>
              <p>서울 종로구3</p>
              <p>100.5억</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="watched-cell">
              <i className="bx bxs-buildings"></i>
              <p>서울 종로구4</p>
              <p>100.5억</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="watched-cell">
              <i className="bx bxs-buildings"></i>
              <p>서울 종로구5</p>
              <p>100.5억</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="watched-cell">
              <i className="bx bxs-buildings"></i>
              <p>서울 종로구6</p>
              <p>100.5억</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="watched-cell">
              <i className="bx bxs-buildings"></i>
              <p>서울 종로구7</p>
              <p>100.5억</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="watched-cell">
              <i className="bx bxs-buildings"></i>
              <p>서울 종로구8</p>
              <p>100.5억</p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="watched-cell">
              <i className="bx bxs-buildings"></i>
              <p>서울 종로구9</p>
              <p>100.5억</p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div >

    </div >
  );
}


export default App;
