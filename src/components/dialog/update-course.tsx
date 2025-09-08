import { Edit, FileText, Plus, Upload, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { updateCourse } from "@/actions/course/update/update-course";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CourseEntity from "@/db/entities/course";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface CourseModule {
  id?: string;
  name: string;
}

interface CourseFormData {
  id: string;
  name: string;
  description: string;
  imageUrl?: string | null;
  priceInCents: number;
  modules: CourseModule[];
}

interface UpdateCourseProps {
  course: CourseEntity;
  onCourseUpdated: () => void;
}

export default function UpdateCourseDialog({
  course,
  onCourseUpdated,
}: UpdateCourseProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [newModuleName, setNewModuleName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<CourseFormData>({
    id: course.id,
    name: course.name,
    description: course.description,
    imageUrl: course.imageUrl,
    priceInCents: course.priceInCents,
    modules:
      course.courseContent?.map((content) => ({
        id: content.id,
        name: content.content,
      })) || [],
  });

  useEffect(() => {
    setFormData({
      id: course.id,
      name: course.name,
      description: course.description,
      imageUrl: course.imageUrl,
      priceInCents: course.priceInCents,
      modules:
        course.courseContent?.map((content) => ({
          id: content.id,
          name: content.content,
        })) || [],
    });

    if (course.imageUrl) {
      setImagePreview(course.imageUrl);
    }
  }, [course]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name === "priceInCents") {
      const numericValue = parseFloat(value.replace(",", ".")) * 100;
      setFormData((prev) => ({ ...prev, [name]: Math.round(numericValue) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setImagePreview(imageUrl);
        setFormData((prev) => ({ ...prev, imageUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addModule = () => {
    if (!newModuleName.trim()) {
      toast.error("Digite o nome do módulo");
      return;
    }

    const newModule: CourseModule = {
      name: newModuleName.trim(),
    };

    setFormData((prev) => ({
      ...prev,
      modules: [...prev.modules, newModule],
    }));

    setNewModuleName("");
    toast.success("Módulo adicionado");
  };

  const removeModule = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      modules: prev.modules.filter((_, i) => i !== index),
    }));
    toast.info("Módulo removido");
  };

  const updateCourseHandler = async () => {
    if (!formData.name.trim()) {
      toast.error("Nome do curso é obrigatório!");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Descrição do curso é obrigatória!");
      return;
    }

    if (formData.modules.length === 0) {
      toast.error("Adicione pelo menos um módulo ao curso!");
      return;
    }

    setIsLoading(true);
    try {
      if (!formData.id) {
        toast.error("ID do curso não encontrado");
        return;
      }

      const response = await updateCourse(formData as UpdateCourseRequest);

      if (response.success) {
        toast.success("Curso atualizado com sucesso!");
        onCourseUpdated();
        setIsOpen(false);
      } else {
        toast.error(response.error || "Erro ao atualizar curso");
      }
    } catch (error) {
      console.error("Erro ao atualizar curso:", error);
      toast.error("Erro ao atualizar curso");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      id: course.id,
      name: course.name,
      description: course.description,
      imageUrl: course.imageUrl,
      priceInCents: course.priceInCents,
      modules:
        course.courseContent?.map((content) => ({
          id: content.id,
          name: content.content,
        })) || [],
    });

    if (course.imageUrl) {
      setImagePreview(course.imageUrl);
    } else {
      setImagePreview(null);
    }

    setNewModuleName("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Editar Curso: {course.name}
          </DialogTitle>
          <DialogDescription>
            Atualize os detalhes do curso abaixo. Todos os campos são
            obrigatórios.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Informações Básicas</h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do Curso *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Ex: React Avançado"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priceInCents">Preço (R$) *</Label>
                <Input
                  id="priceInCents"
                  name="priceInCents"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.priceInCents / 100}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value) * 100;
                    setFormData((prev) => ({
                      ...prev,
                      priceInCents: Math.round(value),
                    }));
                  }}
                  placeholder="0,00"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição do Curso *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Descreva o conteúdo e objetivos do curso..."
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Imagem do Curso</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Label
                  htmlFor="image"
                  className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-gray-300 p-4 hover:bg-gray-50"
                >
                  <Upload className="h-4 w-4" />
                  {imagePreview ? "Alterar imagem" : "Selecionar imagem"}
                </Label>
                {imagePreview && (
                  <div className="relative">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      className="h-16 w-16 rounded-md object-cover"
                      width={64}
                      height={64}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                      onClick={() => {
                        setImagePreview(null);
                        setFormData((prev) => ({ ...prev, imageUrl: "" }));
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Módulos do Curso *</h3>

            <div className="flex gap-2">
              <Input
                value={newModuleName}
                onChange={(e) => setNewModuleName(e.target.value)}
                placeholder="Nome do módulo"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addModule();
                  }
                }}
              />
              <Button type="button" onClick={addModule} variant="outline">
                <Plus className="mr-1 h-4 w-4" />
                Adicionar
              </Button>
            </div>

            {formData.modules.length > 0 ? (
              <div className="divide-y rounded-md border">
                {formData.modules.map((module, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">{module.name}</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeModule(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-md border border-dashed py-8 text-center text-gray-500">
                <FileText className="mx-auto mb-2 h-12 w-12 opacity-50" />
                <p>Nenhum módulo adicionado</p>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex flex-col gap-2 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              resetForm();
              setIsOpen(false);
            }}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button
            onClick={updateCourseHandler}
            disabled={isLoading || formData.modules.length === 0}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? "Atualizando..." : "Atualizar Curso"}
            {!isLoading && <Plus className="ml-2 h-4 w-4" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface UpdateCourseRequest {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  priceInCents: number;
  modules: CourseModule[];
}
