import { useEffect, useState } from "react";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import api from "../services/api";

function Leaderboard() {

    const [leaderboard, setLeaderboard] = useState([]);

    const fetchLeaderboard = async () => {

        try {

            const res = await api.get("/dashboard/leaderboard");

            setLeaderboard(res.data.leaderboard);

        } catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {

        fetchLeaderboard();

    }, []);

    return (

        <div className="bg-gray-100 min-h-screen">

            <Navbar />

            <div className="flex">

                <Sidebar />

                <div className="flex-1 p-8">

                    <div className="mb-8">

                        <h1 className="text-4xl font-bold">

                            🏆 Leaderboard

                        </h1>

                        <p className="text-gray-500 mt-2">

                            Top performers based on average interview score.

                        </p>

                    </div>

                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">

                        <table className="w-full">

                            <thead className="bg-blue-600 text-white">

                                <tr>

                                    <th className="p-4 text-left">

                                        Rank

                                    </th>

                                    <th className="p-4 text-left">

                                        Name

                                    </th>

                                    <th className="p-4 text-left">

                                        Email

                                    </th>

                                    <th className="p-4 text-center">

                                        Average Score

                                    </th>

                                    <th className="p-4 text-center">

                                        Answers

                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    leaderboard.map((user) => (

                                        <tr
                                            key={user.email}
                                            className="border-b hover:bg-gray-50"
                                        >

                                            <td className="p-4 font-bold">

                                                {

                                                    user.rank === 1 ?

                                                        "🥇"

                                                        :

                                                        user.rank === 2 ?

                                                            "🥈"

                                                            :

                                                            user.rank === 3 ?

                                                                "🥉"

                                                                :

                                                                user.rank

                                                }

                                            </td>

                                            <td className="p-4">

                                                {user.name}

                                            </td>

                                            <td className="p-4">

                                                {user.email}

                                            </td>

                                            <td className="p-4 text-center font-semibold">

                                                {user.averageScore}/10

                                            </td>

                                            <td className="p-4 text-center">

                                                {user.totalAnswers}

                                            </td>

                                        </tr>

                                    ))

                                }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Leaderboard;