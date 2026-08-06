import MainLayout from '@/myComponents/mainLayout/MainLayout'
import { useState, useRef } from 'react'
import { useFormik } from 'formik'
import { addDoctorValidationSchema } from '@/constants/schemas/addDoctorSchema'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import useAddDoctor from '@/hooks/doctors/useAddDoctor'

const AddDoctor = () => {
    const [imagePreview, setImagePreview] = useState(null)
    const [fileName, setFileName] = useState('')
    const fileInputRef = useRef(null);
    const { addDoctor, isPending } = useAddDoctor();

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result)
            }
            reader.readAsDataURL(file)
            setFileName(file.name)
        }
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            speciality: '',
            yearsOfExperience: '',
            description: '',
            image: ''
        },
        validationSchema: addDoctorValidationSchema,
        onSubmit: (values) => {
            const formData = new FormData()
            formData.append('name', values.name)
            formData.append('speciality', values.speciality)
            formData.append('yearsOfExperience', values.yearsOfExperience)
            formData.append('description', values.description)

            const imageFile = fileInputRef.current?.files?.[0]
            if (imageFile) {
                formData.append('image', imageFile)
            }
            addDoctor(formData);
            
        },
    })

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-8 max-w-3xl">
                <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
                    <h1 className="text-2xl font-bold text-card-foreground mb-6">Add New Doctor</h1>


                    <form onSubmit={formik.handleSubmit} className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-foreground">
                                    Doctor Name *
                                </label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Enter doctor's full name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    aria-invalid={!!formik.touched.name && !!formik.errors.name}
                                />
                                {formik.touched.name && formik.errors.name && (
                                    <p className="text-sm text-destructive" role="alert">
                                        {formik.errors.name}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="speciality" className="text-sm font-medium text-foreground">
                                    Speciality *
                                </label>
                                <Input
                                    id="speciality"
                                    name="speciality"
                                    placeholder="Enter speciality (e.g., Cardiology)"
                                    value={formik.values.speciality}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    aria-invalid={!!formik.touched.speciality && !!formik.errors.speciality}
                                />
                                {formik.touched.speciality && formik.errors.speciality && (
                                    <p className="text-sm text-destructive" role="alert">
                                        {formik.errors.speciality}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <label htmlFor="yearsOfExperience" className="text-sm font-medium text-foreground">
                                    Years of Experience *
                                </label>
                                <Input
                                    id="yearsOfExperience"
                                    name="yearsOfExperience"
                                    type="number"
                                    placeholder="Enter years of experience"
                                    value={formik.values.yearsOfExperience}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    aria-invalid={!!formik.touched.yearsOfExperience && !!formik.errors.yearsOfExperience}
                                />
                                {formik.touched.yearsOfExperience && formik.errors.yearsOfExperience && (
                                    <p className="text-sm text-destructive" role="alert">
                                        {formik.errors.yearsOfExperience}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="image" className={`text-sm font-medium text-foreground`}>
                                    Doctor Image *
                                </label>
                                <div className="relative">
                                    <input
                                        ref={fileInputRef}
                                        id="image"
                                        type="file"
                                        name="image"
                                        accept="image/jpeg,image/jpg,image/png,image/webp"
                                        onChange={(e)=>{
                                            handleImageChange(e);
                                            formik.handleChange(e);
                                        }}
                                        className={`absolute inset-0 w-full h-full opacity-0 cursor-pointer 
                                            ${formik.touched.image && formik.errors.image ? 'border border-red-500' : 'border-red-500'}`}
                                    />
                                    <div className={`flex h-9 w-full rounded-lg border ${formik.touched.image && formik.errors.image ?
                                    'border-red-500' :
                                    'border-border'} bg-background px-3 py-1 text-sm`}>
                                        {imagePreview ? (
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="h-7 w-7 rounded-lg object-cover"
                                                />
                                                <span className="text-foreground truncate">
                                                    {fileName || 'Image selected'}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-muted-foreground ">Click to upload image</span>
                                        )}
                                    </div>
                                </div>
                                {formik.touched.image && formik.errors.image && (
                                    <p className="text-sm text-destructive" role="alert">
                                        {formik.errors.image}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="description" className="text-sm font-medium text-foreground">
                                Description *
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows={4}
                                placeholder="Enter doctor's description, qualifications, etc."
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={cn(
                                    'flex w-full rounded-lg border border-border bg-background px-3 py-2 text-sm',
                                    'placeholder:text-muted-foreground',
                                    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
                                    'disabled:cursor-not-allowed disabled:opacity-50',
                                    formik.touched.description && formik.errors.description && 'border-destructive'
                                )}
                                aria-invalid={!!formik.touched.description && !!formik.errors.description}
                            />
                            {formik.touched.description && formik.errors.description && (
                                <p className="text-sm text-destructive" role="alert">
                                    {formik.errors.description}
                                </p>
                            )}
                        </div>

                        <div className="flex gap-4 pt-4 border-t border-border">
                            <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
                                {isPending ? 'Adding...' : 'Add Doctor'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    formik.resetForm()
                                    setImagePreview(null)
                                    setFileName('')
                                    if (fileInputRef.current) {
                                        fileInputRef.current.value = ''
                                    }
                                }}
                                disabled={isPending}
                                className="w-full sm:w-auto"
                            >
                                Reset
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </MainLayout>
    )
}

export default AddDoctor