function SkillsMember() {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [newSkill, setNewSkill] = useState("");
    const [skillError, setSkillError] = useState("");
    const [skillSuccess, setSkillSuccess] = useState("");

    const history = useHistory();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get(`/api/users/${id}`);
                setUser(data);
                setSkills(data.skills);
                setLoading(false);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchUser();
    }, [id]);

    const handleDelete = async (skillId) => {
        try {
            setIsDeleting(true);
            await axios.delete(`/api/users/${id}/skills/${skillId}`);
            setSkills(skills.filter((skill) => skill.id !== skillId));
            setIsDeleting(false);
        } catch (error) {
            setError(error.message);
            setIsDeleting(false);
        }
    };

    const handleAddSkill = async () => {
        if (newSkill.length < 3) {
            setSkillError("Skill name should be at least 3 characters long");
            return;
        }

        try {
            setIsUpdating(true);
            setSkillError("");
            setSkillSuccess("");
            const { data } = await axios.post(`/api/users/${id}/skills`, {
                name: newSkill,
            });
            setSkills([...skills, data]);
            setNewSkill("");
            setSkillSuccess("Skill added successfully");
            setIsUpdating(false);

        } catch (error) {
            setError(error.message);
            setIsUpdating(false);
        }
    };

    const handleUpdateSkill = async (skillId, name) => {
        if (name.length < 3) {
            setSkillError("Skill name should be at least 3 characters long");
            return;
        }

        try {
            setIsUpdating(true);
            setSkillError("");
            setSkillSuccess("");
            const { data } = await axios.put(`/api/users/${id}/skills/${skill}`);
        }
        catch (error) {
            setError(error.message);
            setIsUpdating(false);
        }
    }
}