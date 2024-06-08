import Modal from '@/components/ui/modal/modal'
import Login from '@/components/Login'
 
export default function Page() {
  return (
    <Modal isOpen={true}>
      <Login />
    </Modal>
  )
}