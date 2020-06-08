import Swal from 'sweetalert2'

export default function Notif(props) {
  return (
    Swal.fire({
      title: props.title | '',
      text: props.message | '',
      icon: props.status | 'error'
    }).then(() => {
      if (props.next) {
        window.location.href = `/${props.next}`
      }
    })
  )
}
