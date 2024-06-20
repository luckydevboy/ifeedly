import { Fragment, ReactNode } from "react";
import { Menu, Transition } from "@headlessui/react";
import { cx } from "class-variance-authority";

type Props = {
  children: ReactNode;
  list: { title: string; onClick: () => void }[];
};

const DropdownMenu = ({ children, list }: Props) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="block">{children}</Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          {list.map((item, index) => (
            <div className="p-1">
              <Menu.Item key={index}>
                {({ active }) => (
                  <button
                    onClick={item.onClick}
                    className={cx([
                      active && "bg-zinc-100",
                      "group flex w-full items-center rounded-md px-2 py-2 text-sm font-semibold text-cornflowerBlue transition-colors",
                    ])}
                  >
                    {item.title}
                  </button>
                )}
              </Menu.Item>
            </div>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropdownMenu;
