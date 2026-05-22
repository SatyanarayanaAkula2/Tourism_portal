import { motion } from "framer-motion";

function Navanim({children}){
    return(
        <motion.div initial={{y:-100}} animate={{y:0}} transition={{duration:0.5}}>
            {children}
        </motion.div>
    )
}
export default Navanim;