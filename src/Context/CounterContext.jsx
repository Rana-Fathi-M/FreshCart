import { createContext } from "react";

//hnady 3la el function el bta5od mni el initial value
export const CounterContext = createContext();
//el counteContext da object gowah provider da bya5od property btkon ay value w el maffrod anady 3la el provider da w arender gowah el 3ayzhom y4ofo el value de 
export default function CounterContextProvider(props){
  const [counter, setCounter] = useState(0);
  function changeCounter(){
    setCounter(Math.random);
  }
  return <CounterContext.Provider value={{counter , changeCounter}}>
    {/* ay 7ad hy7slo rendering hena hykon leh sala7ya ywsl ll value de fhn3ml rendering l kol el application hna*/}
    {/* kda ay 7ad mwgod f el routing 3ndo sala7ia 3la el value el 3nd el counterContext */}
    {props.children}
  </CounterContext.Provider>
}
