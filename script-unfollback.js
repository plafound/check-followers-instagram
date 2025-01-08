document.getElementById("compareBtn").addEventListener("click", () => {
    const followingFile = document.getElementById("followingFile").files[0];
    const followersFile = document.getElementById("followersFile").files[0];
  
    if (!followingFile || !followersFile) {
      alert("Please upload both files!");
      return;
    }
  
    const reader1 = new FileReader();
    const reader2 = new FileReader();
  
    reader1.onload = function (e) {
      const followingData = JSON.parse(e.target.result).relationships_following.map(
        (item) => item.string_list_data?.[0] || {}
      );
  
      reader2.onload = function (e) {
        const followersData = JSON.parse(e.target.result).map(
          (item) => item.string_list_data?.[0]?.value || ""
        );
  
        // Compare following and followers
        const notFollowingBack = followingData.filter(
          (user) => user.value && !followersData.includes(user.value)
        );
  
        // Display results in table
        const resultTable = document.getElementById("resultTable").querySelector("tbody");
        resultTable.innerHTML = ""; // Clear previous results
  
        if (notFollowingBack.length === 0) {
          resultTable.innerHTML = "<tr><td colspan='3'>Everyone is following you back!</td></tr>";
        } else {
          notFollowingBack.forEach((user, index) => {
            if (user.href && user.value) {
              const row = document.createElement("tr");
  
              const cellNo = document.createElement("td");
              cellNo.textContent = index + 1;
  
              const cellUsername = document.createElement("td");
              cellUsername.textContent = user.value;
  
              const cellLink = document.createElement("td");
              const link = document.createElement("a");
              link.href = user.href;
              link.className = "btn btn-primary";
              link.textContent = "View Profile";
              link.target = "_blank";
              cellLink.appendChild(link);
  
              row.appendChild(cellNo);
              row.appendChild(cellUsername);
              row.appendChild(cellLink);
  
              resultTable.appendChild(row);
            }
          });
        }
      };
  
      reader2.readAsText(followersFile);
    };
  
    reader1.readAsText(followingFile);
  });
  