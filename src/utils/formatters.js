export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ro-RO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export const getStatusColor = (status) => {
    switch (status) {
        case 'active': return 'green';
        case 'inactive': return 'yellow';
        case 'graduated': return 'blue';
        default: return 'gray';
    }
};

export const getStatusLabel = (status) => {
    switch (status) {
        case 'active': return 'Activ';
        case 'inactive': return 'Inactiv';
        case 'graduated': return 'Absolvent';
        default: return 'Necunoscut';
    }
};

export const getGpaColor = (gpa) => {
    if (gpa >= 9) return 'green.500';
    if (gpa >= 8) return 'blue.500';
    return 'orange.500';
};

export const getGpaLabel = (gpa) => {
    if (gpa >= 9) return 'Excelent';
    if (gpa >= 8) return 'Foarte bine';
    return 'Bine';
};