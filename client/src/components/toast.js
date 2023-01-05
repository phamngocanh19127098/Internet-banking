import { useCallback } from 'react'
import { useEffect } from 'react';


const Toast = ({ toastlist, setList }) => {

    const deleteToast = useCallback(id => {
        const toastListItem = toastlist.filter(e => e.id !== id);
        setList(toastListItem);
    }, [toastlist, setList]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (toastlist.length) {
                deleteToast(toastlist[0].id);
            }
        }, 3000);

        return () => {
            clearInterval(interval);
        }
    }, [toastlist, deleteToast]);

    return (
        <div className="text-sm fixed z-50  bottom-4 right-4 ">
            {
                toastlist.map((toast, i) => (
                    <div
                        key={i}
                        className={`relative mb-4 rounded-t shadow-lg shadow-gray-400  opacity-90  h-20 w-80 text-white p-2.5 bottom-4 right-4 bg-${toast.backgroundColor}`}
                    >
                        <button className="absolute top-2 right-2  text-base" onClick={() => deleteToast(toast.id)}>X</button>
                        <div>
                            <p className=" inline font-bold text-base text-left mt-0 mb-1.5  w-72 h-4">{toast.title}</p>

                            <p className="m-0 text-left">{toast.description}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Toast