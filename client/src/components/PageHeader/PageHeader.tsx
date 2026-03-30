
import { firstLetter } from '../../utils/utilsfn';
import style from './PageHeader.module.scss'

type PageHeaderProps = {
    title: string
}


const PageHeader = ({title} : PageHeaderProps) => {
    return (
          <div className={style.linksContainer}>
                <h2 className={style.header}>{firstLetter(title)}</h2>
            </div>
    )
}

export default PageHeader