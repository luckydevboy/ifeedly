import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { Composer } from "@/app/components/index";
import toast from "react-hot-toast";
import { useCreatePost } from "@/app/api/hooks";

type Props = { isOpen: boolean; onClose: () => void };

const CreatePostModal = ({ isOpen, onClose }: Props) => {
  const createPost = useCreatePost();
  const addNewPost = (content: string) => {
    createPost.mutateAsync(content).then(() => {
      toast.success("Your post successfully sent.");
      onClose();
    });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-davysGray"
                >
                  Create Post
                </Dialog.Title>
                <div className="mt-2">
                  <Composer
                    onSubmit={addNewPost}
                    isLoading={createPost.isPending}
                    buttonPosition="outside"
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreatePostModal;
