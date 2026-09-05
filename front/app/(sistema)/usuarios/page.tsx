import Link from "next/link";

export default function Usuarios(){


    return(

    <div>
        <div>
            <h1>
                Gestao de usuarios
            </h1>
            <Link href="/usuarios/novo"></Link>
        </div>

        <div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                        </tr>
                    </thead>
                    <body>
                        <tr>
                            <td>
                                Wagner
                            </td>
                        </tr>
                    </body>
                </table>
            </div>
        </div>







    </div>)
}