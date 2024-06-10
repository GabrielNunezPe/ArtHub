import * as z from "zod"
import { Models } from "appwrite"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import { PostValidation } from "@/lib/validation"
import { useToast } from "../ui/use-toast"
import { useUserContext } from "@/context/AuthContext"
import FileUploader from "../shared/FileUploader"
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queriesAndMutations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"

type PostFormProps = {
    post?: Models.Document;
    action: 'Publicar' | 'Actualizar';
}
 
const PostForm = ({ post, action }: PostFormProps) => {
  const { mutateAsync: createPost, isPending: isLoadingCreate } = 
  useCreatePost();

  const { mutateAsync: updatePost, isPending: isLoadingUpdate } = 
  useUpdatePost();

  const { user } = useUserContext();
  const { toast } = useToast();
  const navigate = useNavigate();

    // 1. Define your form.
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post.tags.join(',') : ''
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PostValidation>) {
    if (post && action === 'Actualizar') {
      const updatedPost = await updatePost({
        ...values, 
        postId: post.$id, 
        imageId: post?.imageId,
        imageUrl: post?.imageUrl,
      })

      if(!updatedPost) {
        toast({ title: 'Por favor, intentalo de nuevo' })
      }

      return navigate(`/posts/${post.$id}`);
    }
    
    const newPost = await createPost({
        ...values,
        userId: user.id,
    })

    if (!newPost) {
        toast({
            title: 'Por favor, intentalo de nuevo'
        })
    }

    navigate('/');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Descripción</FormLabel>
              <FormControl>
                <Textarea className="shad-textarea custom-scrollbar" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Añadir fotos</FormLabel>
              <FormControl>
                <FileUploader 
                    fieldChange={field.onChange}
                    mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Añadir ubicación</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field}/>
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Añadir Etiquetas (separadas por coma " , ")</FormLabel>
              <FormControl>
                <Input 
                    type="text" 
                    className="shad-input"
                    placeholder="Arte, Expresión, Aprender"
                    {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

          <div className="flex gap-4 items-center justify-end">
            <Button 
                type="button" 
                className="shad-button_dark_4"
            >
                Cancelar
            </Button>
            <Button 
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={isLoadingCreate || isLoadingUpdate}
            >

              {isLoadingCreate || isLoadingUpdate && 'Cargando... '}
              {action} Post
            </Button>
          </div>
      </form>
    </Form>
  )
}

export default PostForm