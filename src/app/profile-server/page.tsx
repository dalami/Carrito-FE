import { getSession } from '@auth0/nextjs-auth0';

export default async function ProfileServer() {
  const session = await getSession();
  console.log("session Auth", session);
  
  
  

  // Asegúrate de que la sesión no sea null o undefined antes de acceder a user
  if (!session || !session.user ) {
    return <div>No hay sesión activa</div>;
  }

  const { user } = session;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
