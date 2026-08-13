import { Stethoscope, Calendar, Star, Brain, HeartPulse, Baby, Pill } from 'lucide-react'
import Button from '@/components/ui/button'
import { Link } from 'react-router';

const specialtyIcons = {
    surgery: Stethoscope,
    cardiology: HeartPulse,
    neurology: Brain,
    pediatrics: Baby,
    dermatology: Pill,
    orthopedics: Stethoscope,
};

const DoctorCard = ({ doctor }) => {
    const { _id, name, speciality, image, yearsOfExperience, description, createdAt } = doctor;


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    };

    const SpecialtyIcon = specialtyIcons[speciality?.toLowerCase()] || Stethoscope;

    return (
        <article className="group relative flex flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="relative h-48 w-full overflow-hidden bg">
                <div className="image flex items-center justify-center">
                    <img
                        src={image}
                        alt={name}
                        className="w-40 rounded-full mt-4"
                        loading="lazy"
                    />
                </div>
                
            </div>
            <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex items-center gap-2">
                    <SpecialtyIcon className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-primary capitalize">{speciality}</span>
                    <span className="flex h-1 w-1 rounded-full bg-muted-foreground/30" />
                    <span className="text-sm text-muted-foreground">
                        {yearsOfExperience}+ years exp
                    </span>
                </div>

                <h3 className="mb-2 text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    Dr. {name}
                </h3>

                <p className="mb-4 flex-1 text-sm text-muted-foreground line-clamp-2">
                    {description || 'Experienced doctor dedicated to providing quality healthcare.'}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Joined {formatDate(createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Star className="h-3.5 w-3.5 text-amber-500 fill-current" />
                        <span>4.8 (124 reviews)</span>
                    </div>
                </div>
            </div>

            <div className="border-t p-4 bg-muted/30">
                <Button className="w-full" size="sm" >
                    <Link to={`/doctors/${_id}`}>
                        View Profile
                    </Link>
                </Button>
            </div>
        </article>
    )
}

export default DoctorCard