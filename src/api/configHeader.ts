const header = (contentType?: 'application/json' | 'multipart/form-data') => {
  const token = localStorage.getItem('app-tk')
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': contentType || 'application/json'
    }
  }
}

export { header }
