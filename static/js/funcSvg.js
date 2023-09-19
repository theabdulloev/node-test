const icons = {
    
}

const s = (nameIcom,theme)=>{
    switch (nameIcom) {
        case 'profil':
            if(theme == 'dark') return icons.profil.dark
            else return icons.profil.light
        default:
            break;
    }
}

export default s;