import React, {useState, useEffect} from 'react' // O useState é um exemplo de Hooks ( utilizar funções que conectão os recursos da Aplicação)
import './styles.css'
import { Card, CardProps } from '../../components/Card'

interface ProfileResponse {
  name?: string,
  avatar_url: string;
}

interface User {
  name?: string,
  avatar: string;
}

export function Home() {
  const [studentName, setStudentName] = useState('');
  const [ students, setStudents] = useState<CardProps[]>([])
  const [user, setUser] = useState<User>({} as User)

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    }
    setStudents(prevState => [...prevState, newStudent]) // '...' para pegar todo conteúdo do vetor e despejar ali dentro
  }
  
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.github.com/users/atilaCSilva')
      const data = await response.json() as ProfileResponse
      console.log("DADOS ===> ", data)

      setUser({
        avatar: data.avatar_url,
      })
    }


    fetchData()
    
  }, [])
  

  return (
    <div className="container">
      <header>
         <h1>Lista de Presença</h1>
          <div>
            <strong>
              <a href="https://github.com/atilaCSilva">Atila</a>
            </strong>
            <img src={user.avatar} alt="Foto de Perfil de Atila" />
          </div>
      </header>
      
      <input 
      type="text" 
      placeholder="Digite algo.."
      onChange={e => setStudentName(e.target.value)}
      />
      <button
      onClick={handleAddStudent}
      >Adicionar</button>
      {
        students.map(student => (
          <Card 
          key={student.time} // Ao usar uma Estru.Reo, é necessário uma chave única de identificação.
          name={student.name} 
          time={student.time}/>
        ))
      }
      
    </div>
  )
}

