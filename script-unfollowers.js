document.getElementById("compareBtn2").addEventListener("click", () => {
    const oldFollowersFile = document.getElementById("oldFollowersFile").files[0];
    const newFollowersFile = document.getElementById("newFollowersFile").files[0];
  
    if (!oldFollowersFile || !newFollowersFile) {
      alert("Please upload both files!");
      return;
    }
  
    const reader1 = new FileReader();
    const reader2 = new FileReader();
  
    reader1.onload = function (e) {
      const oldFollowersData = JSON.parse(e.target.result).map(
        (item) => item.string_list_data?.[0]?.value || ""
      );
  
      reader2.onload = function (e) {
        const newFollowersData = JSON.parse(e.target.result).map(
          (item) => item.string_list_data?.[0]?.value || ""
        );
  
        // Find accounts that unfollowed
        const unfollowed = oldFollowersData.filter(
          (user) => !newFollowersData.includes(user)
        );
  
        // Display results in table
        const resultTable = document.getElementById("resultTable2").querySelector("tbody");
        resultTable.innerHTML = ""; // Clear previous results
  
        if (unfollowed.length === 0) {
          resultTable.innerHTML = "<tr><td colspan='3'>No accounts have unfollowed you.</td></tr>";
        } else {
          unfollowed.forEach((username, index) => {
            const row = document.createElement("tr");
  
            const cellNo = document.createElement("td");
            cellNo.textContent = index + 1;
  
            const cellUsername = document.createElement("td");
            cellUsername.textContent = username;
  
            const cellLink = document.createElement("td");
            const link = document.createElement("a");
            link.href = `https://www.instagram.com/${username}`;
            link.textContent = "View Profile";
            link.target = "_blank";
            cellLink.appendChild(link);
  
            row.appendChild(cellNo);
            row.appendChild(cellUsername);
            row.appendChild(cellLink);
  
            resultTable.appendChild(row);
          });
        }
      };
  
      reader2.readAsText(newFollowersFile);
    };
  
    reader1.readAsText(oldFollowersFile);
  });
  