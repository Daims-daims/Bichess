
import '../../App.scss'
import '../../styles/constante.scss'

function AppTest() {
  
  const userProfile = location.pathname.split('/')[2]

  return <div>
           {userProfile && <p>Profile</p>}
           {!userProfile && <p>My Profile</p>} 
        </div>
}


export default AppTest
