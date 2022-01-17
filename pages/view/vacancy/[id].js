import { useRouter } from 'next/router'

export default function ViewVacancy() {
    const router = useRouter()
    const { id } = router.query
    return (
        <div className="page page-view page-view_vacancy">
            {id}
        </div>
    )
}