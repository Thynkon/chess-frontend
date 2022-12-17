import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Loader = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: white;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;


const ballStyle = {
    display: "block",
    width: "7rem",
    height: "7rem",
    backgroundColor: "black",
    borderRadius: "6.5rem"
};

const bounceTransition = {
    y: {
        duration: 0.4,
        yoyo: Infinity,
        ease: "easeOut"
    },
    backgroundColor: {
        duration: 0,
        yoyo: Infinity,
        ease: "easeOut",
        repeatDelay: 0.8
    }
};

export function LoadingAnimation() {
    const navigate = useNavigate();
    useEffect(() => {
        const current_route = localStorage.getItem('current_route');
        if (current_route !== null) {
            const timer = setTimeout(() => {
                navigate(current_route);
            }, 1500);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [navigate]);

    return (
        <Loader>
            <div className='mt-40 basis-full'>
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Loading...</h2>
            </div>
            <div className='basis-full'>
                <motion.span
                    style={ballStyle}
                    transition={bounceTransition}
                    animate={{
                        y: ["50%", "-50%"],
                        backgroundColor: ["#ff6699", "#6666ff"]
                    }}
                />
            </div>
        </Loader>
    );
}