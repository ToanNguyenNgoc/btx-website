const header = (contentType?: 'application/json' | 'multipart/form-data') => {
  const token = localStorage.getItem('app-tk')
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': contentType || 'application/json'
    }
  }
}

const headerParam = <T,>(params: T) => {
  const token = localStorage.getItem('app-tk')
  return {
    params,
    headers: {
      Authorization: `Bearer ${token}`
    },
  }
}

export { header, headerParam }
