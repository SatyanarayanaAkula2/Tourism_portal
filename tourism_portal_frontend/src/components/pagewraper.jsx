import {motion} from 'framer-motion';

function Pagewraper({children}){
    return(
        <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:0.5}}>
            {children}
        </motion.div>
    )
}

export default Pagewraper;