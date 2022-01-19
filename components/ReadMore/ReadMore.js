import { useState } from "react";
import ArrowDown2 from '../../assets/img/arrow-down2.svg';
import Collapse from 'react-bootstrap/Collapse';

export default function ReadMore({ content }) {
    content = content || ''
    const [isWhole, setIsWhole] = useState(false)

    return (
        <div className="readmore">

            <div className="readmore-content">
                {content.slice(0, 820)}
                <Collapse in={isWhole}>
                    <div id="collapsed-text">
                        {content.slice(820, content.length)}
                    </div>
                </Collapse>
            </div>

            {content.length > 820 && <div className="readmore-btn" >
                <button
                    aria-controls="collapsed-text"
                    aria-expanded={isWhole}
                    type="button"
                    onClick={() => setIsWhole(!isWhole)}
                >Read more
                    <span><ArrowDown2 height={6} style={{ transform: isWhole ? 'rotate(180deg)' : 'initial' }} /></span>
                </button>
            </div>}
        </div>
    )
}