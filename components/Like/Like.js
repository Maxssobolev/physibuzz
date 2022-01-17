import React, { useState } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import LikeIcon from '../../assets/img/icons/like.svg';
import LikedIcon from '../../assets/img/icons/liked.svg';

export default function Like({ __id, __isLiked: isLiked }) {
    const [like, setLike] = useState(isLiked || false)
    const handleLike = () => {
        setLike(!like)
    }


    return (
        <div className="action action_like">

            <button type='button' onClick={handleLike}>
                <SwitchTransition mode='out-in'>
                    <CSSTransition
                        key={like}
                        timeout={200}
                        classNames="fade"
                    >
                        {like ? <LikedIcon /> : <LikeIcon />}
                    </CSSTransition>
                </SwitchTransition>
            </button>

        </div>
    )
}