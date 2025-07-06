export function getUserRole(): 'ADMIN' | 'USER' | 'VIEWER' {
  return (localStorage.getItem('role') as 'ADMIN' | 'USER' | 'VIEWER') || 'VIEWER';
}


