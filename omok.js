const tile = document.getElementsByClassName('tile');
let color = 'black';
let clicked_row_idx = 0;
let clicked_col_idx = 0;
let omokpan = [
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','',''],
  ['','','','','','','','','','','','','','','','']
];
let row = omokpan.length;
let col = omokpan[0].length;
let win = false;
let turn = 0;

function win_check() {
  // 가로
  for (let c=2; c<col-2; c++) {
    for (let r=0; r<row; r++) {
      if (omokpan[r][c] == '●' || omokpan[r][c] == '○') {
        if (
          omokpan[r][c] == omokpan[r][c-2] &&
          omokpan[r][c] == omokpan[r][c-1] &&
          omokpan[r][c] == omokpan[r][c+1] &&
          omokpan[r][c] == omokpan[r][c+2]
        ) { win = true; break; }
      }
    }
  }
  // 세로
  for (let r=2; r<row-2; r++) {
    for (let c=0; c<col; c++) {
      if (omokpan[r][c] == '●' || omokpan[r][c] == '○') {
        if (
          omokpan[r][c] == omokpan[r-2][c] &&
          omokpan[r][c] == omokpan[r-1][c] &&
          omokpan[r][c] == omokpan[r+1][c] &&
          omokpan[r][c] == omokpan[r+2][c]
        ) { win = true; break; }
      }
    }
  }
  // 대각선
  for (let r=2; r<row-2; r++) {
    for (let c=2; c<col-2; c++) {
      if (omokpan[r][c] == '●' || omokpan[r][c] == '○') {
        if (  // 좌에서 우로 내려가는 대각선
          omokpan[r][c] == omokpan[r-2][c-2] &&
          omokpan[r][c] == omokpan[r-1][c-1] &&
          omokpan[r][c] == omokpan[r+1][c+1] &&
          omokpan[r][c] == omokpan[r+2][c+2]
        ) { win = true; break; }
        else if ( // 좌에서 우로 올라가는 대각선
          omokpan[r][c] == omokpan[r-2][c+2] &&
          omokpan[r][c] == omokpan[r-1][c+1] &&
          omokpan[r][c] == omokpan[r+1][c-1] &&
          omokpan[r][c] == omokpan[r+2][c-2]
        ) { win = true; break; }
      }
    }
  }
}

function tile_click(e) {
  // 배열에 돌 찍기
  const row_arr = Array.from(document.querySelectorAll('.row'));
  const clicked_row = e.target.parentElement;
  clicked_row_idx = row_arr.indexOf(clicked_row);   // 클릭한 돌의 행

  const tiles_in_clicked_row = Array.from(clicked_row.querySelectorAll('.tile'));
  clicked_col_idx = tiles_in_clicked_row.indexOf(e.target);   // 클릭한 돌의 열

  omokpan[clicked_row_idx][clicked_col_idx] = (color == 'black' ? '●' : '○');

  // 화면에 돌 찍기
  let stone = e.target.querySelector('.stone');
  stone.classList.add(color);

  // 승리 확인
  win_check();

  // 돌을 둔 곳은 더 이상 클릭 함수 실행 X
  e.target.removeEventListener('click', tile_click);

  // 승리 메세지 출력, 흑백 변경, 턴 수 카운트
  turn++;
  if (win) {
    console.log(color + "'s win!!");
    console.log('진행된 턴 : ' + turn);
    turn = 0;
  }
  color = (color == 'black' ? 'white' : 'black');
}

for (let i=0; i<tile.length; i++) {
  tile[i].addEventListener('click', tile_click);
}
