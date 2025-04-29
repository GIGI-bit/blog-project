import { toast } from "react-toastify";

type DeleteButtonProps = {
  id: number;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {
  const handleDelete = async (id: number) => {
    const response = await fetch(`http://localhost:3000/api/blogs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      toast.success("Blog deleted successfully");
      console.log("good");
    } else {
      toast.error("Error deleting blog!!");
      console.log("error");
    }
  };
  return <button onClick={() => handleDelete(id)}>Delete</button>;
};

export default DeleteButton;
