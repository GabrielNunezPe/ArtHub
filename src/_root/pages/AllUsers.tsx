import Loader from "@/components/shared/Loader";
import UserCard from "@/components/shared/UserCard";
import { useToast } from "@/components/ui/use-toast"

import { useGetUsers } from "@/lib/react-query/queriesAndMutations";


const AllUsers = () => {
  const { toast } = useToast();

  const { data: users, isLoading, isError: isErrorUsers } = useGetUsers();

  if (isErrorUsers) {
    toast({ title: "Algo salio mal" });

    return;
  }

  return (
    <div className="common-container">
      <div className="user-container">
        <h2 className="h3-bold md:h2-bold text-left w-full">Todos los usuarios</h2>
        {isLoading && !users ? (
          <Loader />
        ) : (
          <ul className="user-grid">
            {users?.documents.map((users) =>(
              <li key={users?.$id} className="flex-1 min-w-[200px] w-full">
                <UserCard user={users} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllUsers;