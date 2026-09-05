export default function SistemaLayout({children}){
    return (
    <div className="flex">
    <header></header>
    
    {children}


    <footer></footer>
    </div>);



}