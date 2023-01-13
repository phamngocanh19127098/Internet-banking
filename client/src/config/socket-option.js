const token = localStorage.getItem('userToken')
export const socketOption = {
    transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${token}`
          }
        }
      }
}