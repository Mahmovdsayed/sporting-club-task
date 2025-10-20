'use client';

import { motion } from "framer-motion";
interface IProps {
    children?: React.ReactNode;
}
const CardMotion = ({ children }: IProps) => {
    return <>
        <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0, y: 20, },
                visible: { opacity: 1, y: 0, },
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            {children}
        </motion.div>
    </>;
};

export default CardMotion;