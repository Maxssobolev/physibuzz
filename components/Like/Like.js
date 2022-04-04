import React, { useEffect, useState } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import LikeIcon from '../../assets/img/icons/like.svg';
import LikedIcon from '../../assets/img/icons/liked.svg';
import { useWindowDimensions } from '../Hooks/useWindowDimensions';
import api from '../../apiConfig'
export default function Like({ __id, type, __isLiked }) {
    const [like, setLike] = useState(__isLiked)
    const handleLike = () => {
        if (like) {
            //remove like
            if (type == 'vacancy')
                api.post(`/api/v1/wishlist/remove/vacancies/${__id}`).then(r => setLike(false));
            else if (type == 'course')
                api.post(`/api/v1/wishlist/remove/courses/${__id}`).then(r => setLike(false));

        }
        else {
            //add like
            if (type == 'vacancy')
                api.post(`/api/v1/wishlist/add/vacancies/${__id}`).then(r => setLike(true));
            else if (type == 'course')
                api.post(`/api/v1/wishlist/add/courses/${__id}`).then(r => setLike(true));
        }

    }
    const isMobile = useWindowDimensions().width <= 425


    return (
        <div className="action action_like">

            <button type='button' onClick={handleLike}>
                <SwitchTransition mode='out-in'>
                    <CSSTransition
                        key={like}
                        timeout={200}
                        classNames="fade"
                    >
                        {like ? <LikedIcon {...(isMobile ? { width: 32, height: 32 } : {})} /> : <LikeIcon {...(isMobile ? { width: 32, height: 32 } : {})} />}
                    </CSSTransition>
                </SwitchTransition>
            </button>

        </div>
    )
}