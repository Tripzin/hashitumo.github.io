window.onload = function () {
  class Board {

    //PLAYER1:歩
    //PLAYER2:と金
    BLANK = 0;
    PLAYER1 = 1;
    PLAYER2 = 2;

    // 0:空白
    // 1:歩
    // 2:と金
    boardInfo = [];

    constructor() {
      this.initBoardInfo();
      // this.debugInitBoardInfo();
    }

    // はさみ将棋の初期配置を行う
    initBoardInfo() {
      let boardInfo = new Array(11).fill(null);

      for (let index = 0; index < boardInfo.length; index++) {

        if (index == 0) {
          let temp = new Array(11).fill(-1);
          boardInfo[index] = temp;
        }
        else if (index == 1) {
          let temp = new Array(11).fill(this.PLAYER2);
          temp[0] = -1;
          temp[boardInfo.length - 1] = -1;
          boardInfo[index] = temp;
        }
        else if (index == boardInfo.length - 2) {
          let temp = new Array(11).fill(this.PLAYER1);
          temp[0] = -1;
          temp[boardInfo.length - 1] = -1;
          boardInfo[index] = temp;
        }
        else if (index == boardInfo.length - 1) {
          let temp = new Array(11).fill(-1);
          boardInfo[index] = temp;
        }

        else {
          let temp = new Array(11).fill(this.BLANK);
          temp[0] = -1;
          temp[boardInfo.length - 1] = -1;
          boardInfo[index] = temp;
        }

      }


      this.boardInfo = boardInfo;

    }
    // デバック用の配置
    debugInitBoardInfo() {

      // this.boardInfo = [
      //   [1, 2, 2, 2, 2, 2, 2, 2, 0],
      //   [0, 0, 0, 0, 0, 0, 0, 0, 1],
      //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
      //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
      //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
      //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
      //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
      //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
      //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
      // ];

      this.boardInfo = [
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [-1, 2, 2, 2, 2, 2, 2, 2, 2, 2, -1],
        [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
        [-1, 0, 0, 0, 2, 0, 0, 0, 0, 0, -1],
        [-1, 0, 0, 0, 1, 0, 0, 0, 0, 0, -1],
        [-1, 0, 2, 1, 0, 1, 2, 0, 0, 0, -1],
        [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
        [-1, 0, 0, 0, 2, 0, 0, 0, 0, 0, -1],
        [-1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1],
        [-1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1],
        [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],


      ];

    }

    movePiece(fromSquare, toSquare) {
      let boardInfo = this.boardInfo;

      let fromX = fromSquare[0];
      let fromY = fromSquare[1];
      let toX = toSquare[0];
      let toY = toSquare[1];
      let count = 0;
      let piece = boardInfo[fromY][fromX];

      console.log(fromSquare);
      console.log(toSquare);


      for (let iX = -1; iX <= 1; iX++) {

        for (let iY = -1; iY <= 1; iY++) {

          if ((iX + iY == 0) || (Math.abs(iX) + Math.abs(iY) == 2)) {

            continue;

          } else {

            count = this.countCatchPiece(toSquare, iX, iY, piece);
            console.log("count: " + count);

            // 挟んでいるコマのいるマスを空白にする.
            for (let c = 1; c <= count; c++) {

              boardInfo[toY + iY * c][toX + iX * c] = 0;

            }

          }

        }

      }

      boardInfo[fromY][fromX] = 0;
      boardInfo[toY][toX] = piece;

      this.boardInfo = boardInfo;
    }
    /**
     * 
     * @param {コマを置く予定のマス} setPosition 
     * @param {調べる方向} direction 
     * @param {} player 
     */
    countCatchPiece(setPosition, dirX, dirY, player) {

      let boardInfo = this.boardInfo;
      let posX = setPosition[0];
      let posY = setPosition[1];
      let i;

      for (i = 1; boardInfo[posY + i * dirY][posX + i * dirX] == this.oppose(player); i++);


      if (boardInfo[posY + i * dirY][posX + i * dirX] == player) {
        return i - 1;
      } else {
        return 0;
      }

    }



    // 一方向について置くことが可能な
    //現在地から最も遠い座標を返す
    searchBlankPosition(position, dirX, dirY) {

      let boardInfo = this.boardInfo;
      let posX = position[0];
      let posY = position[1];
      let i;

      for (i = 1; boardInfo[posY + i * dirY][posX + i * dirX] == this.BLANK; i++);
      return i - 1;
    }

    searchLigalMove(position) {

      let boardInfo = this.boardInfo;
      let posX = position[0];
      let posY = position[1];
      let toX;
      let toY;
      let count = 0;
      let legalMoveList = [];

      for (let iX = -1; iX <= 1; iX++) {

        for (let iY = -1; iY <= 1; iY++) {

          if ((iX + iY == 0) || (Math.abs(iX) + Math.abs(iY) == 2)) {

            continue;

          } else {

            count = this.searchBlankPosition(position, iX, iY);
            console.log("count: " + count);

            for (let c = 1; c <= count; c++) {

              toX = posX + iX * c;
              toY = posY + iY * c;

              // console.log("posX: " + toX);
              // console.log("posY: " + toY);
              legalMoveList.push([toX, toY])

            }

          }

        }

      }

      return legalMoveList;

    }

    oppose(player) {
      return player == 1 ? this.PLAYER2 : this.PLAYER1;
    }

  }




  /*----------------ここから表示用 -----------------*/


  function displayPiece(player) {

    let imgElement = document.createElement('img');

    if (player === 1) {
      imgElement.title = "H";
      imgElement.className = "img-fluid";
      imgElement.src = "./img/fuhyou.png";
      imgElement.alt = "H";
    } else if (player === 2) {
      imgElement.title = "T";
      imgElement.className = "img-fluid";
      imgElement.src = "./img/tokin.png";
      imgElement.alt = "T";
    } else {
      imgElement.title = "B";
      imgElement.className = "img-fluid";
      imgElement.src = "./img/blank.png";
      imgElement.alt = "B";
    }
    return imgElement;
  }

  function idToSquare(id) {

    let squares = id.split(['-']);

    for (let i = 0; i < squares.length; i++) {
      squares[i] = parseInt(squares[i]);
    }

    return squares;
  }

  function onClickPiece(event) {

    let fromSquare;
    let toSquare;
    let domElement;
    let elegalMoveList;

    console.log(selectedPieces);
    console.dir(event.target.title);
    if ((selectedPieces.length == 0) && (event.target.title == "B")) {

      console.log("Please select piece !!!");

    } else {

      domElement = fixIllegalElement(event.target);
      selectedPieces.push(domElement);

    }

    // 移動元と移動先が揃った
    if (selectedPieces.length == 2) {
      console.log("selectdPieces:");
      console.dir(selectedPieces);
      if (selectedPieces[0] === selectedPieces[1]) {
        // NANIMOSHINAI
      } else {

        fromSquare = idToSquare(selectedPieces[0].id)
        toSquare = idToSquare(selectedPieces[1].id)

        elegalMoveList = BoardInstance.searchLigalMove(fromSquare);

        for (let i = 0; i < elegalMoveList.length; i++) {
          if (elegalMoveList[i][0] == toSquare[0] && elegalMoveList[i][1] == toSquare[1]) {
            BoardInstance.movePiece(fromSquare, toSquare);
            break;
          } else {
            console.log("no!")
          }
        }



        updateBoard();

      }

      selectedPieces = []
    }

  }

  function updateBoard() {

    // may be not use ...
    let boardTable = document.getElementById('display').children[0];
    let tbody = boardTable.children[0];
    let trs = tbody.children;
    let tds;
    let pieceSquare;


    for (let trI = 0; trI < trs.length; trI++) {

      tds = trs[trI].children;

      for (tdI = 0; tdI < tds.length; tdI++) {

        pieceSquare = idToSquare(tds[tdI].children[0].id);
        tds[tdI].children[0].children[0].remove();
        tds[tdI].children[0].appendChild(displayPiece(boardInfo[pieceSquare[1]][pieceSquare[0]]));
      }

    }

  }
  // javascriptの影響か、event.targetで取ってくるelementが異なる場合がある
  //再現性なし
  function fixIllegalElement(domElement) {

    if (domElement.localName === 'img') {
      domElement = domElement.parentNode;
    }
    return domElement;
  }


  let BoardInstance = new Board();
  let boardInfo = BoardInstance.boardInfo;
  let selectedPieces = [];
  // // BoardInstance.movePiece([4, 7], [4, 2]);
  // BoardInstance.searchLigalMove([4, 7]);
  // console.dir(boardInfo);

  let displaySpace = document.getElementById('display');

  let gameBoard = document.createElement('table');
  let tbody = document.createElement('tbody');
  let tr;
  let td;

  gameBoard.className = "table table-bordered";

  for (let y = 1; y < boardInfo.length - 1; y++) {

    tr = document.createElement('tr');

    for (let x = 1; x < boardInfo.length - 1; x++) {

      td = document.createElement('td');
      textDiv = document.createElement("div");
      textDiv.className = "btn btn-light content";
      textDiv.id = x + "-" + y;
      textDiv.onclick = (event) => { onClickPiece(event) };
      textDiv.appendChild(displayPiece(boardInfo[y][x]));
      td.appendChild(textDiv);
      tr.appendChild(td);
    }

    tbody.appendChild(tr);

  }



  gameBoard.appendChild(tbody);
  displaySpace.appendChild(gameBoard);

  //IOS用の設定
  function prevent(e) {
    event.preventDefault();
  }
  //document.addEventListener("touchstart",prevent,{passive:false});
  //document.addEventListener("touchmove",prevent,{passive:false});
  //document.addEventListener("touchend",prevent,{passive:false});
  document.addEventListener("gesturestart", prevent, { passive: false });
  document.addEventListener("gesturechange", prevent, { passive: false });
  document.addEventListener("gestureend", prevent, { passive: false });

}
