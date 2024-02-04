// randomな値を返す関数を定義

// indexをidにするのはNG 削除後の追加などで重複する可能性があるため
const getRandomId = () => {
  return Math.floor( Math.random() * 10000 ) ;
}

export { getRandomId }